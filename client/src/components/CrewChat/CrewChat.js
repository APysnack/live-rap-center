import React, { useEffect, useState } from 'react';
import api from '../../api/chatApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Chat from '../SharedComponents/Chat/Chat';
import { useSelector } from 'react-redux';

function CrewChat({ cable }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);
  const { crewId, crewName } = location.state || {};
  const navigate = useNavigate();

  // callback function, used after GET api request made
  const loadMessages = (res) => {
    console.log(res);
    setMessages(res.data);
  };

  // loads all messages currently in the db
  useEffect(() => {
    if (crewId !== undefined) {
      api.getCrewChatMessages(crewId, loadMessages);
    } else {
      navigate('/login');
    }
  }, []);

  // handles socket connection for realtime updates
  useEffect(() => {
    if (crewId) {
      const paramsToSend = {
        // The key here needs to be "channel" and should have the camelcase naming convention in rails e.g. conversation_channel.rb
        channel: 'CrewChatChannel',
        id: crewId,
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
      // note we send the crewId and post to the chat belonging to that crew
      const payload = {
        user_id: user.id,
        crew_id: crewId,
        body: message.data,
      };
      api.postCrewChatMessage(payload);
    }
  };

  const title = () => {
    return crewName + ' Chat Room';
  };

  return (
    <div>
      <Chat messages={messages} title={title()} onSubmit={sendMessage} />
    </div>
  );
}

export default CrewChat;
