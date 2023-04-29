import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import { ChatContainer, FormContainer } from './Chat.styles';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';

function ChatForm({ messages, onSubmit }) {
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    onSubmit(newMessage);
    setNewMessage('');
  };

  return (
    <ContentContainer width={'70vw'} height={'80vh'} flexDirection='column'>
      <ChatContainer>
        <div className='messages-window'>
          {messages?.length > 0
            ? messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  className='chat-message'
                />
              ))
            : null}
        </div>
      </ChatContainer>
      <FormContainer onSubmit={sendMessage}>
        <div className='message-container'>
          <input
            className='input-field'
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
        </div>
      </FormContainer>
    </ContentContainer>
  );
}

export default ChatForm;
