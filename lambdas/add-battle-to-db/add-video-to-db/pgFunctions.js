const { Client } = require('pg');
const { getCaCertificate, getParam } = require('./utils');

const DB_PASSWORD_PARAM_PATH = '/live-rap-center/prod/AWS_RDS_PASSWORD';
const currentDate = new Date().toISOString();

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

const findBattlerByName = async (client, battlerName) => {
  const query = {
    text: 'SELECT * FROM battlers WHERE name = $1 LIMIT 1',
    values: [battlerName],
  };

  try {
    const result = await client.query(query);
    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error occurred while executing query:', error);
    throw error;
  }
};

const createBattle = async (client, title, leagueId, battleUrl, video) => {
  const publishedDate = new Date(video.snippet.publishedAt).toISOString();

  const insertQuery =
    'INSERT INTO battles (league_id, battle_url, title, created_at, updated_at, views, youtube_date) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *;';
  const values = [
    leagueId,
    battleUrl,
    title,
    currentDate,
    currentDate,
    video.viewCount,
    publishedDate,
  ];
  try {
    const result = await client.query(insertQuery, values);
    const battleObject = result.rows[0];
    return battleObject;
  } catch (error) {
    console.error('Error trying to create battle' + error);
    throw error;
  }
};

const createBattler = async (client, battlerName) => {
  const insertQuery = {
    text: 'INSERT INTO battlers (name, created_at, updated_at) VALUES ($1, $2, $3) RETURNING *',
    values: [battlerName, currentDate, currentDate],
  };

  try {
    const result = await client.query(insertQuery);
    const battlerObject = result.rows[0];
    return battlerObject;
  } catch (error) {
    console.error('Error occurred while creating battler:', error);
    throw error;
  }
};

const createBattlerBattle = async (client, battleId, battlerId) => {
  const insertQuery = {
    text: 'INSERT INTO battler_battles (battle_id, battler_id, created_at, updated_at) VALUES ($1, $2, $3, $4)',
    values: [battleId, battlerId, currentDate, currentDate],
  };

  try {
    const result = await client.query(insertQuery);
    const battlerBattleObject = result.rows[0];
    return battlerBattleObject;
  } catch (error) {
    console.error('Error occurred while creating BattlerBattle:', error);
    throw error;
  }
};

module.exports = {
  connectToDatabase,
  createBattler,
  createBattle,
  createBattlerBattle,
  findBattlerByName,
  closeDatabaseConnection,
};
