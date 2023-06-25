async function createChatMessage(client, chatType, chatId, userId, body) {
  // do not move this to the global scope. new timestamps must be generated for each creation
  const currentDate = new Date().toISOString();
  let query;

  if (chatType === 'crew') {
    query =
      'INSERT INTO crew_chat_messages (crew_chat_id, user_id, body, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)';
  } else if (chatType === 'league') {
    query =
      'INSERT INTO league_chat_messages (league_chat_id, user_id, body, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)';
  }
  try {
    console.log('INSERTING INTO DB');
    const values = [
      Number(chatId),
      Number(userId),
      body,
      currentDate,
      currentDate,
    ];
    console.log('VALUES ARE');
    console.log(values);
    console.log(chatType);
    const res = await client.query(query, values);
    console.log(res);
  } catch (err) {
    console.error('Failed to create crew chat message:', err);
  }
}

module.exports = {
  createChatMessage,
};
