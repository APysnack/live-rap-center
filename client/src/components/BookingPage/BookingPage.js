import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BattlerBookingForm from './BattlerBookingForm';

function BookingPage() {
  const location = useLocation();
  const { talent, booker, bookingType } = location.state || {};

  return (
    <div>
      {bookingType === 'battler' ? (
        <BattlerBookingForm booker={booker} battler={talent} />
      ) : null}
    </div>
  );
}

export default BookingPage;
