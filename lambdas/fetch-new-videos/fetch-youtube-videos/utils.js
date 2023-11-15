const axios = require('axios');
const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const ssm = new AWS.SSM();

const YT_VIDEOS_API = 'https://www.googleapis.com/youtube/v3/videos';
const YT_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';
const CA_BUCKET_NAME = 'lrc-private-files';
const CA_FILE_NAME = 'us-east-1-bundle.pem';
const YOUTUBE_API_KEY_PATH = '/live-rap-center/prod/YT_API_KEY';

const { invokeAddVideoToDbLambda } = require('./pgFunctions');

const createBattlesFor = async (videos, league, processedUrls) => {
  for (const video of videos) {
    const battleUrl = video.id.videoId;

    if (!processedUrls.includes(battleUrl)) {
      processedUrls.push(battleUrl);

      const battleInfo = {
        leagueId: league.id,
        battleUrl: battleUrl,
        video: video,
      };

      console.log('THIS SHOULD BE THE EVENT');
      console.log(battleInfo);

      // invokeAddVideoToDbLambda(battleInfo);
    }
  }
};

const getYoutubeApiKey = async () => {
  if (process.env.LAMBDA_ENV === 'local') {
    return process.env.YT_API_KEY;
  } else {
    return await getParam(YOUTUBE_API_KEY_PATH);
  }
};

const fetchVideosFromChannel = async (
  channelId,
  nextPageToken,
  videoFetchDate
) => {
  const youtubeApiKey = await getYoutubeApiKey();
  const searchApiUrl = `${YT_SEARCH_API}?key=${youtubeApiKey}`;

  const payload = {
    pageToken: nextPageToken || undefined,
    channelId: channelId,
    type: 'video',
    maxResults: 50,
    part: 'snippet',
    order: 'date',
    publishedAfter: videoFetchDate,
  };

  const options = {
    method: 'get',
    params: payload,
  };

  try {
    const response = await axios.get(searchApiUrl, options);

    const token = response?.data?.nextPageToken || null;
    const videos = response.data.items;

    const videosWithVsInTitle = filterByVersus(videos);

    const contentDetails = await fetchContentDetails(
      getVideoIds(videosWithVsInTitle)
    );

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

const getVideoIds = (videos) => {
  return videos.map((video) => video.id.videoId).join(',');
};

const exceedsDuration = (duration) => {
  const MINUTE_THRESHOLD = 7;
  const regex = /PT(?:([0-9]+)H)?(?:([0-9]+)M)?(?:([0-9]+)S)?/;
  const matches = duration.match(regex);
  const hours = parseInt(matches[1]) || 0;
  const minutes = parseInt(matches[2]) || 0;
  return hours > 0 || minutes > MINUTE_THRESHOLD;
};

// removes Youtube videos shorter than 7 mins & attaches viewCount
const removeYouTubeShorts = (videos, contentDetails) => {
  return videos
    .map((video) => {
      const { videoId } = video.id;
      const videoContentDetails = contentDetails.find(
        (detail) => detail.id === videoId
      );

      if (
        videoContentDetails?.contentDetails?.duration &&
        exceedsDuration(videoContentDetails.contentDetails.duration)
      ) {
        video.viewCount = videoContentDetails.statistics.viewCount;
        return video;
      }

      return null;
    })
    .filter((video) => video !== null);
};

const fetchContentDetails = async (videoIds) => {
  const youtubeApiKey = await getYoutubeApiKey();
  const videosApiUrl = `${YT_VIDEOS_API}?key=${youtubeApiKey}`;
  const payload = {
    id: videoIds,
    part: 'contentDetails,statistics',
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

const getParam = async (paramPath) => {
  const params = {
    Name: paramPath,
    WithDecryption: true,
  };

  try {
    const data = await ssm.getParameter(params).promise();

    const parameterValue = data.Parameter.Value;
    return parameterValue;
  } catch (error) {
    console.error(
      'Error occurred while retrieving parameter from Parameter Store:',
      error
    );
    throw error;
  }
};

async function getCaCertificate() {
  const params = {
    Bucket: CA_BUCKET_NAME,
    Key: CA_FILE_NAME,
  };

  try {
    const data = await s3.getObject(params).promise();

    const caCertificate = data.Body.toString();
    return caCertificate;
  } catch (error) {
    console.error(
      'Error occurred while retrieving CA certificate from S3:',
      error
    );
    throw error;
  }
}

module.exports = {
  fetchVideosFromChannel,
  formatDate,
  createBattlesFor,
  getParam,
  getCaCertificate,
  filterByVersus,
  getVideoIds,
  fetchContentDetails,
  removeYouTubeShorts,
  exceedsDuration,
  invokeAddVideoToDbLambda,
};
