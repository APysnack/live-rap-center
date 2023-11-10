const axios = require('axios');

const YT_VIDEOS_API = 'https://www.googleapis.com/youtube/v3/videos';
const YT_SEARCH_API = 'https://www.googleapis.com/youtube/v3/search';
const AWS = require('aws-sdk');

const CA_BUCKET_NAME = 'lrc-private-files';
const CA_FILE_NAME = 'us-east-1-bundle.pem';

const s3 = new AWS.S3();
const ssm = new AWS.SSM();

const YOUTUBE_API_KEY_PATH = '/live-rap-center/prod/YT_API_KEY';

const createBattlesFor = async (videos, league, processedUrls) => {
  for (const video of videos) {
    const battleUrl = video.id.videoId;

    if (processedUrls.includes(battleUrl)) {
      return;
    }

    processedUrls.push(battleUrl);

    const battleInfo = {
      leagueId: league.id,
      battleUrl: battleUrl,
      video: video,
    };

    invokeAddVideoToDbLambda(battleInfo);
  }
};

const invokeAddVideoToDbLambda = async (battleInfo) => {
  const lambdaParams = {
    FunctionName: 'AddVideoToDbFunction',
    InvocationType: 'Event',
    Payload: JSON.stringify(battleInfo),
  };

  try {
    const result = await lambda.invoke(lambdaParams).promise();
    console.log('Lambda invocation result:', result);
  } catch (error) {
    console.error('Error invoking Lambda function:', error);
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

  console.log('CHECKING YOUTUBE API KEY');
  console.log(youtubeApiKey);

  const searchApiUrl = `${YT_SEARCH_API}?key=${youtubeApiKey}`;

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
  const youtubeApiKey = await getYoutubeApiKey();
  const videosApiUrl = `${YT_VIDEOS_API}?key=${youtubeApiKey}`;
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
};
