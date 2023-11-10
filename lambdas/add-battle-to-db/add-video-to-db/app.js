const { getBattlersFrom } = require('./utils');
const {
  findBattlerByName,
  createBattle,
  createBattler,
  createBattlerBattle,
  connectToDatabase,
  closeDatabaseConnection,
} = require('./pgFunctions');

exports.lambdaHandler = async (event, context) => {
  let client;

  try {
    client = await connectToDatabase();

    const battlerNames = getBattlersFrom(event.video);

    if (battlerNames?.length > 0) {
      let battlerObjects = [];
      const battleObject = await createBattle(
        client,
        event.leagueId,
        event.battleUrl
      );

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

    const lambdaResponse = {
      statusCode: 200,
      body: JSON.stringify({
        message: '',
      }),
    };
    return lambdaResponse;
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500, // Internal Server Error
      body: JSON.stringify({
        message: 'An error occurred while processing your request.',
      }),
    };
  } finally {
    if (client) {
      await closeDatabaseConnection(client);
    }
  }
};
