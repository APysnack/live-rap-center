const { parseTitle } = require('./battleParser');
const AWS = require('aws-sdk');

const CA_BUCKET_NAME = 'lrc-private-files';
const CA_FILE_NAME = 'us-east-1-bundle.pem';

const s3 = new AWS.S3();
const ssm = new AWS.SSM();

const getBattlersFrom = (video) => {
  const videoTitle = video.snippet.title;
  const battlers = parseTitle(videoTitle.toUpperCase());
  return battlers;
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

const getTitleFrom = (battlerNames) => {
  if (battlerNames.length === 2) {
    return `${battlerNames[0]} vs ${battlerNames[1]}`;
  } else if (battlerNames.length === 3) {
    return battlerNames.join(' vs ');
  } else {
    const firstPair = `${battlerNames[0]} & ${battlerNames[1]}`;
    const secondPair = `${battlerNames[2]} & ${battlerNames[3]}`;
    return `${firstPair} vs ${secondPair}`;
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
  getBattlersFrom,
  formatDate,
  getCaCertificate,
  getParam,
  getTitleFrom,
};
