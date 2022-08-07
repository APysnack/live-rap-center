import React, { useEffect, useRef, useState } from 'react';
import api from '../../api/chatApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Chat from '../SharedComponents/Chat/Chat';
import { useSelector } from 'react-redux';

function LeagueChat({ cable }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);
  const { leagueId, leagueName } = location.state || {};
  const navigate = useNavigate();

  // callback function, used after GET api request made
  const loadMessages = (res) => {
    console.log(res);
    setMessages(res.data);
  };

  // loads all messages currently in the db
  useEffect(() => {
    if (leagueId !== undefined) {
      api.getChatMessages(leagueId, loadMessages);
    } else {
      navigate('/login');
    }
  }, []);

  // handles socket connection for realtime updates
  useEffect(() => {
    if (leagueId) {
      const paramsToSend = {
        // The key here needs to be "channel" and should have the camelcase naming convention in rails e.g. conversation_channel.rb
        channel: 'LeagueChatChannel',
        id: leagueId,
      };

      const handlers = {
        received(data) {
          setMessages([data, ...messages]);
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
  }, [messages]);

  const sendMessage = (message) => {
    if (message?.data !== '') {
      // note we send the leagueId and post to the chat belonging to that league
      const payload = {
        user_id: user.id,
        league_id: leagueId,
        body: message.data,
      };
      api.postChatMessage(payload);
    }
  };

  const title = () => {
    return leagueName + ' Chat Room';
  };

  return (
    <div>
      <Chat messages={messages} title={title()} onSubmit={sendMessage} />
    </div>
  );
}

export default LeagueChat;
