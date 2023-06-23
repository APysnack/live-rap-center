import React, { useState } from 'react';
import BookingChat from './BookingChat/BookingChat';
import BasicModal from '../../SharedComponents/BasicModal';

function ChatDropDown({ currentUser }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const updateSelectedBooking = (booking) => {
    setModalOpen(true);
    setSelectedBooking(booking);
  };

  return (
    <div
      className='lrc-button'
      style={{
        padding: '0.70em 0em 0.70em 0em',
        width: '16em',
      }}
    >
      <div onClick={() => setDropDownOpen(!dropDownOpen)}>
        Booking - Needs Work
      </div>
      <div>
        {dropDownOpen && currentUser?.battlerBookingOffers?.length > 0
          ? currentUser.battlerBookingOffers.map((booking) => (
              <div
                key={booking.id}
                onClick={() => updateSelectedBooking(booking)}
              >
                {booking.battler.username}
              </div>
            ))
          : null}

        <BasicModal
          width={1000}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        >
          <BookingChat booking={selectedBooking} />
        </BasicModal>
      </div>
    </div>
  );
}

export default ChatDropDown;
