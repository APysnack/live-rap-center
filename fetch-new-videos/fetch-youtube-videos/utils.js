const axios = require('axios');
const { parseTitle } = require('./battleParser');
const {
  findBattlerByName,
  createBattle,
  createBattler,
  createBattlerBattle,
} = require('./pgFunctions');

const YT_VIDEOS_API = 'https://www.googleapis.com/youtube/v3/videos';
const YT_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';

const YT_API_KEY = process.env.YT_API_KEY;

const createBattlesFor = async (client, videos, league, processedUrls) => {
  for (const video of videos) {
    const battleUrl = video.id.videoId;

    if (processedUrls.includes(battleUrl)) {
      return;
    }

    processedUrls.push(battleUrl);

    const battlerNames = getBattlersFrom(video);

    if (battlerNames?.length > 0) {
      let battlerObjects = [];
      const battleObject = await createBattle(client, league.id, battleUrl);

      await Promise.all(
        battlerNames.map(async (battlerName) => {
          const battlerObject = await findBattlerByName(client, battlerName);
          if (battlerObject === null) {
            const newBattlerObj = await createBattler(client, battlerName);
            battlerObjects.push(newBattlerObj);
          } else {
            battlerObjects.push(battlerObject);
          }
        })
      );

      for (const battlerObject of battlerObjects) {
        await createBattlerBattle(client, battleObject.id, battlerObject.id);
      }
    }
  }
};

const getBattlersFrom = (video) => {
  const videoTitle = video.snippet.title;
  const battlers = parseTitle(videoTitle.toUpperCase());
  return battlers;
};

const fetchVideosFromChannel = async (
  channelId,
  nextPageToken,
  videoFetchDate
) => {
  const searchApiUrl = `${YT_SEARCH_API}?key=${YT_API_KEY}`;

  let payload;

  if (nextPageToken) {
    payload = {
      pageToken: nextPageToken,
      channelId: channelId,
      type: 'video',
      maxResults: 50,
      part: 'snippet',
    };
  } else {
    payload = {
      channelId: channelId,
      type: 'video',
      maxResults: 50,
      part: 'snippet',
      publishedAfter: videoFetchDate,
    };
  }

  const options = {
    method: 'get',
    params: payload,
  };

  try {
    const response = await axios.get(searchApiUrl, options);
    const token = response?.data?.nextPageToken || null;
    const videos = response.data.items;

    const videosWithVsInTitle = filterByVersus(videos);

    const videoIds = videosWithVsInTitle.map((video) => video.id.videoId);

    const contentDetails = await fetchContentDetails(videoIds);
    const filteredVideos = removeYouTubeShorts(
      videosWithVsInTitle,
      contentDetails
    );

    return { nextPageToken: token, videos: filteredVideos };
  } catch (error) {
    console.error(error);
    return error;
  }
};

const filterByVersus = (videos) => {
  return videos.filter((video) => {
    const title = video.snippet.title.toLowerCase();
    return title.includes('vs') || title.includes('versus');
  });
};

const removeYouTubeShorts = (videos, contentDetails) => {
  return videos
    .map((video) => {
      const videoId = video.id.videoId;
      const videoContentDetails = contentDetails.find(
        (detail) => detail.id === videoId
      );

      if (
        videoContentDetails &&
        videoContentDetails.contentDetails.duration &&
        videoContentDetails.contentDetails.duration.match(/PT(\d+)M/)
      ) {
        const durationMinutes = parseInt(
          videoContentDetails.contentDetails.duration.match(/PT(\d+)M/)[1]
        );

        if (durationMinutes >= 7) {
          return video;
        }
      }

      return null;
    })
    .filter(Boolean);
};

const fetchContentDetails = async (videoIds) => {
  const videosApiUrl = `${YT_VIDEOS_API}?key=${YT_API_KEY}`;
  const payload = {
    id: videoIds.join(','),
    part: 'contentDetails',
    maxResults: 50,
  };

  const options = {
    method: 'get',
    params: payload,
  };

  try {
    const response = await axios.get(videosApiUrl, options);
    return response.data.items;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const formatDate = (inputDate) => {
  return inputDate.toISOString().slice(0, -5) + 'Z';
};

module.exports = {
  getBattlersFrom,
  fetchVideosFromChannel,
  formatDate,
  createBattlesFor,
};
