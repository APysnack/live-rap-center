const { Client } = require('pg');
const AWS = require('aws-sdk');
const { createChatMessage } = require('./utils');

const SOCKET_ENDPOINT = process.env.SOCKET_ENDPOINT;

exports.lambdaHandler = async (event, context) => {
  const pgClient = new Client({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
  });

  try {
    await pgClient.connect();

    const gatewayClient = new AWS.ApiGatewayManagementApi({
      endpoint: SOCKET_ENDPOINT,
    });

    const incomingMessage = JSON.parse(event.body);
    const chatType = incomingMessage.chatType;
    const chatId = incomingMessage.chatId;
    const userId = incomingMessage.userId;
    const body = incomingMessage.message;
    const username = incomingMessage.userName;
    let connectionIds;

    // async function to add message to the RDS DB but we don't wait on
    // it since it doesn't affect the socket broadcast
    createChatMessage(pgClient, chatType, chatId, userId, body);

    // basically ducktyping a message here
    const messageToBroadcast = JSON.stringify({
      message: {
        body: body,
        user: { id: userId, username: username },
      },
    });

    const dynamoDbClient = new AWS.DynamoDB.DocumentClient();
    const params = {
      TableName: 'ChatConnections',
      IndexName: 'ChatIndex',
      KeyConditionExpression: 'chat_type = :chatType AND chat_id = :chatId',
      ExpressionAttributeValues: {
        ':chatType': chatType,
        ':chatId': chatId,
      },
      ProjectionExpression: 'connection_id',
    };

    try {
      const result = await dynamoDbClient.query(params).promise();
      connectionIds = result.Items.map((item) => item.connection_id);
    } catch (err) {
      console.log('Failed to get connectionIds from DynamoDB table');
    }

    const broadcastPromises = connectionIds.map(async (connectionId) => {
      const params = {
        ConnectionId: connectionId,
        Data: messageToBroadcast,
      };

      try {
        await gatewayClient.postToConnection(params).promise();
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
