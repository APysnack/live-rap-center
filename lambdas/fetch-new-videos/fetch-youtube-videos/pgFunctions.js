const { Client } = require('pg');
const { getCaCertificate, getParam } = require('./utils');

const DB_PASSWORD_PARAM_PATH = '/live-rap-center/prod/AWS_RDS_PASSWORD';

async function connectToDatabase() {
  let dbPassword = process.env.DB_PASSWORD;
  let caCertificate = null;

  const beingInvokedLocally = process.env.LAMBDA_ENV === 'local';

  if (!beingInvokedLocally) {
    caCertificate = await getCaCertificate();
    console.log('CHECKING CA CERTIFICATE');
    console.log(caCertificate);

    dbPassword = await getParam(DB_PASSWORD_PARAM_PATH);
    console.log('CHECKING YOUTUBE DB PASSWORD');
    console.log(dbPassword);
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

module.exports = {
  connectToDatabase,
  initializeLeague,
};
