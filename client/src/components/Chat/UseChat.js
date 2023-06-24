import { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { GET_CHAT_MESSAGES } from './gql';
import { useQuery } from '@apollo/client';

const { REACT_APP_GATEWAY_SOCKET_URL } = process.env;

function useChat(chatType, chatOwnerId, chatTitle, location) {
  const socketRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);

  const { data } = useQuery(GET_CHAT_MESSAGES, {
    variables: {
      chatType: 'league',
      chatId: 1,
    },

    onCompleted: (data) => setMessages(data.chatMessages),
  });

  const sendMessage = (message) => {
    if (message !== '' && chatOwnerId) {
      const messageToSend = {
        action: 'sendMessage',
        message: message,
        chatType: chatType,
        chatId: chatOwnerId,
        userId: user.id,
        userName: user.username,
      };
      socketRef.current.send(JSON.stringify(messageToSend));
    }
  };

  const title = () => {
    return chatTitle + ' Chat Room';
  };

  // handles socket connection for realtime updates
  useEffect(() => {
    if (chatOwnerId && user.id && chatType) {
      const url = `${REACT_APP_GATEWAY_SOCKET_URL}/?userId=${user.id}&chatId=${chatOwnerId}&chatType=${chatType}`;
      const socket = new WebSocket(url);
      socketRef.current = socket;

      socket.onopen = () => {
        console.log(`WebSocket connection to ${chatOwnerId} established.`);
      };
      socket.onclose = () => {
        console.log(`WebSocket connection to ${chatOwnerId} closed.`);
      };
      socket.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        setMessages((messages) => [incomingMessage.message, ...messages]);
      };
      return () => {
        socket.close();
      };
    }
  }, [chatOwnerId, location]);

  return {
    messages,
    title,
    sendMessage,
  };
}

export default useChat;
