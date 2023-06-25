import React from 'react';
import { useSelector } from 'react-redux';

function ChatMessage({ message, className }) {
  const { user } = useSelector((state) => state.user.userState);
  const messageType =
    message.user.id.toString() === user.id.toString() ? 'to' : 'from';
  const messageClass = `message ${messageType}`;
  const classNames = `${className} ${messageClass}`.trim();

  return (
    <div className={classNames}>
      <div>{message.user.username}</div>
      <div>{message.body}</div>
    </div>
  );
}

export default ChatMessage;
