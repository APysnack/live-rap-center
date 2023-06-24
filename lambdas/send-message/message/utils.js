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
    const values = [chatId, userId, body, currentDate, currentDate];
    await client.query(query, values);
  } catch (err) {
    console.error('Failed to create crew chat message:', err);
  }
}

module.exports = {
  createChatMessage,
};
