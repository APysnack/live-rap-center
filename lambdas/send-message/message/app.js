const { Client } = require('pg');
const AWS = require('aws-sdk');
const currentDate = new Date().toISOString();

exports.lambdaHandler = async (event, context) => {
  const pgClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  async function createChatMessage(client, chatType, crewChatId, userId, body) {
    let query;

    if (chatType === 'crew') {
      query =
        'INSERT INTO crew_chat_messages (crew_chat_id, user_id, body, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)';
    }
    try {
      const values = [crewChatId, userId, body, currentDate, currentDate];
      await client.query(query, values);
    } catch (err) {
      console.error('Failed to create crew chat message:', err);
    }
  }

  try {
    // look into faster alternatives. DynamoDB? Elasticache? RDS Proxy?
    await pgClient.connect();

    const awsClient = new AWS.ApiGatewayManagementApi({
      endpoint:
        'https://qss6jdd0w6.execute-api.us-east-1.amazonaws.com/production',
    });
    const incomingMessage = JSON.parse(event.body);
    const chatType = incomingMessage.chatType;
    const chatId = incomingMessage.chatId;
    const userId = incomingMessage.userId;
    const body = incomingMessage.message;
    const username = incomingMessage.userName;

    createChatMessage(pgClient, chatType, chatId, userId, body);

    // basically ducktyping a message here, so the variable names should be
    // rails snakecase convention to match message in database
    const messageToBroadcast = JSON.stringify({
      message: {
        body: body,
        user: { id: userId, username: username },
      },
    });

    let query;

    if (chatType === 'crew') {
      query = `SELECT connection_id FROM crew_chat_connections WHERE crew_chat_id = $1`;
    }

    const values = [chatId];
    const result = await pgClient.query(query, values);
    const connectionIds = result.rows.map((row) => row.connection_id);

    const broadcastPromises = connectionIds.map(async (connectionId) => {
      const params = {
        ConnectionId: connectionId,
        Data: messageToBroadcast,
      };

      try {
        await awsClient.postToConnection(params).promise();
      } catch (err) {
        console.log(`Skipping invalid connection ID: ${connectionId}`);
      }
    });

    await Promise.allSettled(broadcastPromises);

    const response = {
      statusCode: 200,
    };

    return response;
  } catch (err) {
    console.error('Failed to send message:', err);
    return err;
  } finally {
    await pgClient.end();
  }
};
