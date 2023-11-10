const {
  formatDate,
  fetchVideosFromChannel,
  createBattlesFor,
} = require('./utils');
const { connectToDatabase, initializeLeague } = require('./pgFunctions');

exports.lambdaHandler = async (event, context) => {
  try {
    const client = await connectToDatabase();

    const queryResult = await client.query(
      `SELECT * FROM leagues ORDER BY league_name ASC OFFSET $1 LIMIT $2;`,
      [event.startPosition, event.recordsToFetch]
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
        createBattlesFor(newVideos, league, processedUrls);
      }

      if (fetchAllVideos === true) {
        while (nextPageToken !== null) {
          const res = await fetchVideosFromChannel(channelId, nextPageToken);
          nextPageToken = res.nextPageToken;
          newVideos = res.videos;

          if (newVideos.length > 0) {
            await createBattlesFor(newVideos, league, processedUrls);
          }
        }
      }

      await initializeLeague(client, league.id);
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
  }
};
