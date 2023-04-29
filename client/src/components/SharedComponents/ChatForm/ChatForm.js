import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import {
  ChatContainer,
  FormContainer,
  EmojiPickerContainer,
} from './Chat.styles';
import ContentContainer from '../../SharedComponents/ContentContainer/ContentStyleWrapper';
import EmojiPicker from 'emoji-picker-react';

function ChatForm({ messages, onSubmit }) {
  const [newMessage, setNewMessage] = useState('');
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);
  const emojiPickerRef = useRef(null);

  const sendMessage = (e) => {
    e.preventDefault();
    onSubmit(newMessage.trim());
    setNewMessage('');
  };

  const handleEmojiClick = (event) => {
    if (event.emoji) {
      setNewMessage(newMessage + event.emoji);
    }
  };

  const openEmojiPicker = () => {
    setEmojiPickerOpen(!emojiPickerOpen);
  };

  const handleOutsideClick = (e) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(e.target)) {
      setEmojiPickerOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  return (
    <ContentContainer width={'50vw'} height={'80vh'} flexDirection='column'>
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
        <div className='input-wrapper'>
          <input
            className='input-field'
            type='text'
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <div className='emoji-opener' onClick={openEmojiPicker}>
            😀
          </div>
          {emojiPickerOpen ? (
            <EmojiPickerContainer ref={emojiPickerRef}>
              <EmojiPicker onEmojiClick={(e) => handleEmojiClick(e)} />
            </EmojiPickerContainer>
          ) : null}
        </div>
      </FormContainer>
    </ContentContainer>
  );
}

export default ChatForm;
