const currentDate = new Date().toISOString();

const findBattlerByName = async (client, battlerName) => {
  const query = {
    text: 'SELECT * FROM battlers WHERE name = $1',
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

const createBattle = async (client, leagueId, battleUrl) => {
  const insertQuery =
    'INSERT INTO battles (league_id, battle_url, created_at, updated_at) VALUES ($1, $2, $3, $4) RETURNING *;';
  const values = [leagueId, battleUrl, currentDate, currentDate];
  try {
    const result = await client.query(insertQuery, values);
    const battleObject = result.rows[0];
    return battleObject;
  } catch (error) {
    console.error(error);
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

const initializeLeague = async (client, leagueId) => {
  const updateQuery = {
    text: 'UPDATE leagues SET videos_initialized = true, last_video_fetch_date = $2 WHERE id = $1;',
    values: [leagueId, currentDate],
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

module.exports = {
  createBattler,
  createBattle,
  createBattlerBattle,
  findBattlerByName,
  initializeLeague,
};
