import React, { useEffect, useState } from 'react';
import api from '../../../api/chatApi';
import { useNavigate, useLocation } from 'react-router-dom';
import Chat from '../../SharedComponents/Chat/Chat';
import { useSelector } from 'react-redux';

function BookingChat({ cable, bookingId }) {
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const { user } = useSelector((state) => state.user.userState);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(bookingId);
  }, []);

  // callback function, used after GET api request made
  const loadMessages = (res) => {
    console.log(res);
    setMessages(res.data);
  };

  // loads all messages currently in the db
  useEffect(() => {
    if (bookingId !== undefined) {
      api.getBookingChatMessages(bookingId, loadMessages);
    } else {
      navigate('/login');
    }
  }, [bookingId]);

  // handles socket connection for realtime updates
  useEffect(() => {
    if (bookingId) {
      const paramsToSend = {
        // The key here needs to be "channel" and should have the camelcase naming convention in rails e.g. conversation_channel.rb
        channel: 'BookingChatChannel',
        id: bookingId,
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
  }, [messages, bookingId]);

  const sendMessage = (message) => {
    if (message?.data !== '') {
      // note we send the battlerBookingOfferId and post to the chat belonging to that bookingOffer
      // tweaks will be need to be made to
      const payload = {
        user_id: user.id,
        battler_booking_offer_id: bookingId,
        body: message.data,
      };
      api.postBookingChatMessage(payload);
    }
  };

  const title = () => {
    return ' Chat Room';
  };

  return (
    <div>
      {messages?.length > 0 ? (
        <Chat messages={messages} title={title()} onSubmit={sendMessage} />
      ) : null}
    </div>
  );
}

export default BookingChat;
