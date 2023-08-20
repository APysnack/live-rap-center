const { Client } = require('pg');
const {
  fetchVideosFromChannel,
  formatDate,
  createBattlesFor,
} = require('./utils');

const { initializeLeague } = require('./pgFunctions');

exports.lambdaHandler = async (event) => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();

    // NOTE: remember to pass event object when testing locally
    const queryResult = await client.query(
      `SELECT * FROM leagues ORDER BY league_name ASC OFFSET ${event.startPosition} LIMIT ${event.recordsToFetch};`
    );

    const leagues = queryResult.rows;

    for (const league of leagues) {
      let fetchAllVideos = false;

      if (!league.videos_initialized) {
        fetchAllVideos = true;
      }

      let nextPageToken = null;
      let newVideos = null;
      const processedUrls = [];

      const channelId = league.league_url;

      const response = await fetchVideosFromChannel(
        channelId,
        null,
        formatDate(league.last_video_fetch_date)
      );

      nextPageToken = response.nextPageToken;
      newVideos = response.videos;

      if (newVideos.length > 0) {
        await createBattlesFor(client, newVideos, league, processedUrls);
      }

      if (fetchAllVideos === true) {
        while (nextPageToken !== null) {
          const res = await fetchVideosFromChannel(channelId, nextPageToken);
          nextPageToken = res.nextPageToken;
          newVideos = res.videos;

          if (newVideos.length > 0) {
            await createBattlesFor(client, newVideos, league, processedUrls);
          }
        }
      }

      await initializeLeague(client, league.id);
    }

    const response = {
      statusCode: 200,
      body: JSON.stringify({
        message: '',
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
