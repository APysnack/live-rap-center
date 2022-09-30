import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { CREATE_BATTLER_BOOKING_OFFER } from './gql';
import { useNavigate } from 'react-router-dom';
import BattlerBookingForm from '../SharedComponents/BattlerBookingForm/BattlerBookingForm';

function BookingPage() {
  const location = useLocation();
  const [createBattlerBookingOffer] = useMutation(CREATE_BATTLER_BOOKING_OFFER);
  const { talent, booker, bookingType } = location.state || {};
  const navigate = useNavigate();

  const directToBookingChat = () => {
    navigate('/league-settings');
  };

  const createOffer = (
    numberOfRounds,
    minutesPerRound,
    amountOffered,
    comment,
    bookingDate
  ) => {
    createBattlerBookingOffer({
      variables: {
        battlerId: talent.id,
        bookerUserId: booker.id,
        numberOfRounds: numberOfRounds,
        minutesPerRound: minutesPerRound,
        amountOffered: amountOffered,
        comments: comment,
        bookingDate: bookingDate,
      },
      onCompleted: directToBookingChat,
    });
  };

  return (
    <div>
      {bookingType === 'battler' ? (
        <BattlerBookingForm battler={talent} onSubmit={createOffer} />
      ) : null}
    </div>
  );
}

export default BookingPage;
