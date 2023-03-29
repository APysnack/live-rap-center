import React, { useState } from 'react';
import BookingChat from './BookingChat/BookingChat';
import BasicModal from '../../SharedComponents/BasicModal';
import BasicButton from '../../SharedComponents/Buttons/BasicButton';

function ChatDropDown({ currentUser, cable }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const updateSelectedBooking = (booking) => {
    setModalOpen(true);
    setSelectedBooking(booking);
  };

  return (
    <BasicButton padding={'0.9em'} width={'16em'}>
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
          <BookingChat cable={cable} booking={selectedBooking} />
        </BasicModal>
      </div>
    </BasicButton>
  );
}

export default ChatDropDown;
