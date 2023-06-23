const { Client } = require('pg');
const currentDate = new Date().toISOString();

exports.lambdaHandler = async (event, context) => {
  const client = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await client.connect();

    // note: AWS disconnect doesn't have access to url params and is not 100%
    // reliable in when it gets invoked. Remove connections with a script every n hours

    // parameterized query should protect against injection
    // but may want to add additional sanitization in the future
    const userId = parseInt(event['queryStringParameters']['userId']);
    const chatId = parseInt(event['queryStringParameters']['chatId']);
    const chatType = event['queryStringParameters']['chatType'];
    const connectionId = event['requestContext']['connectionId'];
    let query = '';
    if (chatType === 'crew') {
      query =
        'INSERT INTO crew_chat_connections (user_id, crew_chat_id, connection_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)';
    }

    await client.query(query, [
      userId,
      chatId,
      connectionId,
      currentDate,
      currentDate,
    ]);

    return { statusCode: 200 };
  } catch (err) {
    console.error('Failed to send message:', err);
    return err;
  } finally {
    await client.end();
  }
};
