const AWS = require('aws-sdk');
const currentDate = new Date().toISOString();
const TABLE_NAME = 'ChatConnections';

exports.lambdaHandler = async (event, context) => {
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const eventType = event['requestContext']['eventType'];
  const connectionId = event['requestContext']['connectionId'];

  if (eventType === 'CONNECT') {
    try {
      const userId = event['queryStringParameters']['userId'];
      const chatId = event['queryStringParameters']['chatId'];
      const chatType = event['queryStringParameters']['chatType'];

      const params = {
        TableName: TABLE_NAME,
        Item: {
          user_id: userId,
          chat_id: chatId,
          chat_type: chatType,
          connection_id: connectionId,
          created_at: currentDate,
        },
      };

      await dynamodb.put(params).promise();
      return { statusCode: 200 };
    } catch (err) {
      console.error('Failed to send message:', err);
      return err;
    }
  }
  // per AWS Docs disconnect doesn't always work. still need a script to remove orphaned connectionIDs
  else {
    try {
      const params = {
        TableName: TABLE_NAME,
        Key: {
          connection_id: connectionId,
        },
      };

      await dynamodb.delete(params).promise();
      return { statusCode: 200 };
    } catch (err) {
      console.error('Failed to remove item:', err);
      return err;
    }
  }
};
