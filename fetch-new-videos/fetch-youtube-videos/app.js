const { Client } = require('pg');
const {
  getBattlersFrom,
  fetchVideosFromPlaylist,
  fetchPlaylistFor,
} = require('./utils');

const {
  findBattlerByName,
  createBattle,
  createBattler,
  createBattlerBattle,
} = require('./pgFunctions');

exports.lambdaHandler = async (event, context) => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  const createBattlesFor = async (client, videos, league) => {
    for (const video of videos) {
      const battleUrl = video.snippet.resourceId.videoId;
      const battlerNames = getBattlersFrom(video);
      if (battlerNames.length > 0) {
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

    // TODO: Add videosInitialized: true to league model
    // if false, we want to query and get ALL videos
    // else, we need to figure out a way to add a time stamp so we dont fetch videos older than that time

    const queryResult = await client.query('SELECT * FROM leagues;');
    const leagues = queryResult.rows;

    for (const league of leagues) {
      const fetchAllVideos = true;
      let nextPageToken = null;
      let newVideos = null;

      const channelId = league.league_url;
      const playlistId = await fetchPlaylistFor(channelId);
      const response = await fetchVideosFromPlaylist(playlistId, null);
      nextPageToken = response.nextPageToken;
      newVideos = response.videos;

      if (newVideos.length > 0) {
        await createBattlesFor(client, newVideos, league);
      }

      if (fetchAllVideos === true) {
        while (nextPageToken !== null) {
          const res = await fetchVideosFromPlaylist(playlistId, nextPageToken);
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
