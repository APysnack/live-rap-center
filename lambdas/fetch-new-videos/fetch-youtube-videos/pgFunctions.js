const { Client } = require('pg');
const { getCaCertificate, getParam } = require('./utils');

const AWS = require('aws-sdk');
const DB_PASSWORD_PARAM_PATH = '/live-rap-center/prod/AWS_RDS_PASSWORD';
const currentDate = new Date().toISOString();
const lambda = new AWS.Lambda();

async function connectToDatabase() {
  let dbPassword = process.env.DB_PASSWORD;
  let caCertificate = null;

  const beingInvokedLocally = process.env.LAMBDA_ENV === 'local';

  if (!beingInvokedLocally) {
    caCertificate = await getCaCertificate();
    dbPassword = await getParam(DB_PASSWORD_PARAM_PATH);
  }

  const dbVars = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: dbPassword,
    ssl: {
      rejectUnauthorized: beingInvokedLocally ? false : true,
      ca: caCertificate,
    },
  };

  const client = new Client(dbVars);
  await client.connect();
  return client;
}

async function closeDatabaseConnection(client) {
  try {
    await client.end();
    console.log('Database connection closed');
  } catch (error) {
    console.error('Error closing database connection:', error);
    throw error;
  }
}

const initializeLeague = async (client, leagueId) => {
  const updateQuery = {
    text: 'UPDATE leagues SET videos_initialized = true, last_video_fetch_date = $1 WHERE id = $2;',
    values: [currentDate, leagueId],
  };

  try {
    const result = await client.query(updateQuery);
    const leagueObject = result.rows[0];
    return leagueObject;
  } catch (error) {
    console.error('Error occurred while initializing league:', error);
    throw error;
  }
};

const invokeAddVideoToDbLambda = async (battleInfo) => {
  const invokedFunctionName = process.env.ADD_VIDEO_TO_DB_LAMBDA_NAME;

  const lambdaParams = {
    FunctionName: invokedFunctionName,
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

module.exports = {
  connectToDatabase,
  initializeLeague,
  invokeAddVideoToDbLambda,
  closeDatabaseConnection,
};
