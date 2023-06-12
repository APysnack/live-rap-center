const axios = require('axios');
const { parseTitle } = require('./battleParser');

const YT_CHANNEL_API = 'https://www.googleapis.com/youtube/v3/channels';
const YT_API_KEY = 'AIzaSyBPDDrDXiwZum-aFEkE6112H2H61tHY91M';
const YT_PLAYLIST_API = 'https://www.googleapis.com/youtube/v3/playlistItems';
const YT_VIDEOS_API = 'https://www.googleapis.com/youtube/v3/videos';

const getBattlersFrom = (video) => {
  const videoTitle = video.snippet.title;
  const battlers = parseTitle(videoTitle.toUpperCase());
  return battlers;
};

const fetchVideosFromPlaylist = async (playlistId, nextPageToken) => {
  const playlistApiUrl = YT_PLAYLIST_API + '?key=' + YT_API_KEY;
  let payload;

  if (nextPageToken) {
    payload = {
      playlistId: playlistId,
      pageToken: nextPageToken,
      maxResults: 50,
      part: 'snippet',
    };
  } else {
    payload = { playlistId: playlistId, maxResults: 50, part: 'snippet' };
  }

  const options = {
    method: 'get',
    params: payload,
  };

  try {
    const response = await axios.get(playlistApiUrl, options);
    const videos = response.data.items;

    const videosWithVsInTitle = filterByVersus(videos);

    const videoIds = videosWithVsInTitle.map(
      (video) => video.snippet.resourceId.videoId
    );

    const contentDetails = await fetchContentDetails(videoIds);
    const filteredVideos = removeYouTubeShorts(
      videosWithVsInTitle,
      contentDetails
    );

    return filteredVideos;
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
      const videoId = video.snippet.resourceId.videoId;
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

        if (durationMinutes >= 8) {
          return video;
        }
      }

      return null;
    })
    .filter(Boolean);
};

const fetchContentDetails = async (videoIds) => {
  const videosApiUrl = YT_VIDEOS_API + '?key=' + YT_API_KEY;
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

const fetchPlaylistFor = async (channelId) => {
  const channelApiUrl = YT_CHANNEL_API + '?key=' + YT_API_KEY;
  const payload = { id: channelId, part: 'contentDetails' };

  const options = {
    method: 'get',
    params: payload,
  };

  try {
    const response = await axios.get(channelApiUrl, options);
    const data = response.data.items[0];
    return data.contentDetails.relatedPlaylists.uploads;
  } catch (error) {
    console.error(error);
    return error;
  }
};

module.exports = {
  getBattlersFrom,
  fetchVideosFromPlaylist,
  fetchPlaylistFor,
};
