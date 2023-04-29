import React from 'react';
import { useSelector } from 'react-redux';

function ChatMessage({ message, className }) {
  const { user } = useSelector((state) => state.user.userState);
  const messageType = message.attributes.user_id === user.id ? 'to' : 'from';
  const messageClass = `message ${messageType}`;
  const classNames = `${className} ${messageClass}`.trim();

  return (
    <div className={classNames}>
      <div>{message.attributes.username}</div>
      <div>{message.attributes.body}</div>
    </div>
  );
}

export default ChatMessage;
