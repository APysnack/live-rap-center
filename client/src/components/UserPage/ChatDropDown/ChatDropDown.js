import React, { useState, useEffect } from 'react';
import BookingChat from './BookingChat/BookingChat';
import BasicModal from '../../SharedComponents/BasicModal';

function ChatDropDown({ currentUser, cable }) {
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    console.log(currentUser);
  }, [currentUser]);

  const updateSelectedBooking = (booking) => {
    setModalOpen(true);
    setSelectedBooking(booking);
  };

  return (
    <div>
      <div onClick={() => setDropDownOpen(!dropDownOpen)}>BOOKING REQUESTS</div>
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
    </div>
  );
}

export default ChatDropDown;
