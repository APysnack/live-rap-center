const { Client } = require('pg');
const {
  getBattlersFrom,
  fetchVideosFromChannel,
  formatDate,
} = require('./utils');

const {
  findBattlerByName,
  createBattle,
  createBattler,
  createBattlerBattle,
  initializeLeague,
} = require('./pgFunctions');

exports.lambdaHandler = async (event, context) => {
  const client = new Client({
    host: 'lrc-db.cckuob6xrxuf.us-east-1.rds.amazonaws.com',
    port: 5432,
    database: 'lrc-db',
    user: 'postgres',
    password: 'lrcAssurMvensnupDb1!23',
  });

  const createBattlesFor = async (client, videos, league) => {
    for (const video of videos) {
      const battleUrl = video.id.videoId;
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

  try {
    await client.connect();

    // NOTE: remember to pass event object when testing locally - as of now, start position should be
    // in increments of 50 e.g. 0, 50, 100, etc. records to fetch should be 50
    const queryResult = await client.query(
      `SELECT * FROM leagues offset ${event.startPosition} limit ${event.recordsToFetch};`
    );
    const leagues = queryResult.rows;

    for (const league of leagues) {
      let fetchAllVideos = false;

      if (!league.videos_initialized) {
        fetchAllVideos = true;
        await initializeLeague(client, league.id);
      }

      let nextPageToken = null;
      let newVideos = null;

      const channelId = league.league_url;
      const response = await fetchVideosFromChannel(
        channelId,
        null,
        formatDate(league.last_video_fetch_date)
      );
      nextPageToken = response.nextPageToken;
      newVideos = response.videos;

      if (newVideos.length > 0) {
        await createBattlesFor(client, newVideos, league);
      }

      if (fetchAllVideos === true) {
        while (nextPageToken !== null) {
          const res = await fetchVideosFromChannel(channelId, nextPageToken);
          nextPageToken = res.nextPageToken;
          newVideos = res.videos;

          if (newVideos.length > 0) {
            await createBattlesFor(client, newVideos, league);
          }
        }
      }
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: 'test',
      }),
    };
    return response;
  } catch (err) {
    console.log(err);
    return err;
  } finally {
    await client.end();
  }
};
