import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../../api/chatApi';

function useChat(cable, chatType, chatOwnerId, chatTitle) {
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);
  const navigate = useNavigate();

  const sendMessage = (message) => {
    if (message !== '' && chatOwnerId) {
      const payload = {
        user_id: user.id,
        body: message,
        // uses a different key depending on chat type
        [chatType === 'league' ? 'league_id' : 'crew_id']: chatOwnerId,
      };

      if (chatType === 'league') {
        api.postChatMessage(payload);
      } else {
        api.postCrewChatMessage(payload);
      }
    }
  };

  const title = () => {
    return chatTitle + ' Chat Room';
  };

  useEffect(() => {
    // callback function, used after GET api request made
    const loadMessages = (res) => {
      setMessages(res.data);
    };

    if (chatOwnerId !== undefined) {
      if (chatType === 'league') {
        api.getChatMessages(chatOwnerId, loadMessages);
      } else {
        api.getCrewChatMessages(chatOwnerId, loadMessages);
      }
    } else {
      navigate('/login');
    }
  }, [chatOwnerId, navigate]);

  // handles socket connection for realtime updates
  useEffect(() => {
    if (chatOwnerId) {
      const paramsToSend = {
        channel:
          chatType === 'league' ? 'LeagueChatChannel' : 'CrewChatChannel',
        id: chatOwnerId,
      };

      const handlers = {
        received(data) {
          setMessages((messages) => [data, ...messages]);
        },
        connected() {
          console.log('connected');
        },
        disconnected() {
          console.log('disconnected');
        },
      };

      const subscription = cable.subscriptions.create(paramsToSend, handlers);

      return function cleanup() {
        subscription.unsubscribe();
      };
    }
  }, [chatOwnerId, cable]);

  return {
    messages,
    title,
    sendMessage,
  };
}

export default useChat;
