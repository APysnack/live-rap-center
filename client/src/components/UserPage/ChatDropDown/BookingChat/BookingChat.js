import React, { useEffect, useState } from 'react';
import api from '../../../../api/chatApi';
import { useNavigate } from 'react-router-dom';
import ChatForm from '../../../SharedComponents/ChatForm/ChatForm';
import { useSelector } from 'react-redux';
import { BookingChatContainer } from './BookingChat.styles';
import BattlerBookingForm from '../../../SharedComponents/BattlerBookingForm/BattlerBookingForm';

function BookingChat({ booking }) {
  const { user } = useSelector((state) => state.user.userState);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [offer, setOffer] = useState({});

  // callback function, used after GET api request made
  const loadMessages = (res) => {
    setMessages(res.data);
  };

  const loadOffer = (fetchedOffer) => {
    const tempOfferObj = {
      amountOffered: fetchedOffer.amount_offered,
      numberOfRounds: fetchedOffer.number_of_rounds,
      minutesPerRound: fetchedOffer.minutes_per_round,
      date: fetchedOffer.date,
    };

    setOffer(tempOfferObj);
  };

  // loads all messages currently in the db
  useEffect(() => {
    if (booking.id !== undefined) {
      api.getBookingChatMessages(booking.id, loadMessages);
      api.getBookingChatOffer(booking.id, loadOffer);
    } else {
      navigate('/login');
    }
  }, [booking]);

  // handles socket connection for realtime updates
  useEffect(() => {
    if (booking.id) {
      // TODO: switch out for new websocket implementation
      // const paramsToSend = {
      //   // The key here needs to be "channel" and should have the camelcase naming convention in rails e.g. conversation_channel.rb
      //   channel: 'BookingChatChannel',
      //   id: booking.id,
      // };
      // const handlers = {
      //   received(data) {
      //     if (data.type === 'booking_chat_message') {
      //       setMessages([data, ...messages]);
      //     } else if (data.type === 'battler_booking_offer') {
      //       console.log('HERE');
      //       console.log(data);
      //       loadOffer(data.attributes);
      //     }
      //   },
      //   connected() {
      //     console.log('connected');
      //   },
      //   disconnected() {
      //     console.log('disconnected');
      //   },
      // };
      // return function cleanup() {
      //   subscription.unsubscribe();
      // };
    }
  }, [messages, booking.id]);

  const sendMessage = (message) => {
    if (message?.data !== '') {
      // note we send the battlerBookingOfferId and post to the chat belonging to that bookingOffer
      // tweaks will be need to be made to
      const payload = {
        user_id: user.id,
        battler_booking_offer_id: booking.id,
        body: message.data,
      };
      api.postBookingChatMessage(payload);
    }
  };

  const updateBattlerBooking = (
    numberOfRounds,
    minutesPerRound,
    amountOffered,
    comment,
    bookingDate
  ) => {
    console.log('still needs to be written, post new offer to api');
    const payload = {
      battler_booking_offer_id: booking.id,
      number_of_rounds: numberOfRounds,
      minutes_per_round: minutesPerRound,
      amount_offered: amountOffered,
      booking_date: bookingDate,
    };
    console.log(payload);
    api.postBookingChatOffer(payload);
  };

  const deleteBattlerBooking = () => {
    console.log('delete');
  };

  const title = () => {
    return ' Chat Room';
  };

  return (
    <BookingChatContainer>
      <BattlerBookingForm
        onSubmit={updateBattlerBooking}
        onDeny={deleteBattlerBooking}
        fullForm={false}
        defaultData={offer}
      />
      {messages?.length > 0 ? (
        <ChatForm messages={messages} title={title()} onSubmit={sendMessage} />
      ) : null}
    </BookingChatContainer>
  );
}

export default BookingChat;
