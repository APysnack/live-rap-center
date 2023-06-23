import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../../api/chatApi';
import { GET_CHAT_MESSAGES } from './gql';
import { useQuery } from '@apollo/client';

const userId = 1;
const chatId = 1;
const chattType = 'crew';

const url = `wss://qss6jdd0w6.execute-api.us-east-1.amazonaws.com/production/?userId=${userId}&chatId=${chatId}&chatType=${chattType}`;
const socket = new WebSocket(url);

function useChat(cable, chatType, chatOwnerId, chatTitle, location) {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);

  const { data } = useQuery(GET_CHAT_MESSAGES, {
    variables: {
      chatId: 1,
    },
    onCompleted: (data) => setMessages(data.chatMessages),
  });

  const sendMessage = (message) => {
    if (message !== '') {
      const messageToSend = {
        action: 'sendMessage',
        message: message,
        chatType: 'crew',
        chatId: 1,
        userId: 1,
        userName: 'bob',
      };
      socket.send(JSON.stringify(messageToSend));
    }

    // if (message !== '' && chatOwnerId) {
    //   const payload = {
    //     user_id: user.id,
    //     body: message,
    //     // uses a different key depending on chat type
    //     [chatType === 'league' ? 'league_id' : 'crew_id']: chatOwnerId,
    //   };

    //   if (chatType === 'league') {
    //     api.postChatMessage(payload);
    //   } else {
    //     api.postCrewChatMessage(payload);
    //   }
    // }
  };

  const title = () => {
    return chatTitle + ' Chat Room';
  };

  useEffect(() => {
    // // callback function, used after GET api request made
    // const loadMessages = (res) => {
    //   setMessages(res.data);
    // };
    // if (chatOwnerId !== undefined) {
    //   if (chatType === 'league') {
    //     api.getChatMessages(chatOwnerId, loadMessages);
    //   } else {
    //     api.getCrewChatMessages(chatOwnerId, loadMessages);
    //   }
    // }
  }, [chatOwnerId, location]);

  // handles socket connection for realtime updates
  useEffect(() => {
    if (chatOwnerId) {
      socket.onopen = () => {
        console.log('WebSocket connection established.');
      };
      socket.onclose = () => {
        console.log('WebSocket connection closed.');
      };
      socket.onmessage = (event) => {
        const incomingMessage = JSON.parse(event.data);
        setMessages((messages) => [incomingMessage.message, ...messages]);
      };
      return () => {
        socket.close();
      };
    }

    // if (chatOwnerId) {
    //   const paramsToSend = {
    //     channel:
    //       chatType === 'league' ? 'LeagueChatChannel' : 'CrewChatChannel',
    //     id: chatOwnerId,
    //   };
    //   const handlers = {
    //     received(data) {
    //       setMessages((messages) => [data, ...messages]);
    //     },
    //     connected() {
    //       console.log('connected');
    //     },
    //     disconnected() {
    //       console.log('disconnected');
    //     },
    //   };
    //   const subscription = cable.subscriptions.create(paramsToSend, handlers);
    //   return function cleanup() {
    //     subscription.unsubscribe();
    //   };
    // }
  }, [chatOwnerId, cable, location]);

  return {
    messages,
    title,
    sendMessage,
  };
}

export default useChat;
