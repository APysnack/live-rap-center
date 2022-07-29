import React from "react";
import { MessageContainer, Message } from "./Chat.styles";
import { useSelector } from "react-redux";

function ChatMessage({ message }) {
  const { user } = useSelector((state) => state.user.userState);
  const messageType = message.attributes.user_id === user.id ? "to" : "from";
  const messageClass = `message ${messageType}`;

  return (
    <MessageContainer>
      <div className={messageClass}>
        <div>{message.attributes.username}</div>
        <div>{message.attributes.body}</div>
      </div>
    </MessageContainer>
  );
}

export default ChatMessage;
