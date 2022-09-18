import React, { useState } from 'react';
import { GET_ALL_EVENTS } from './gql';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import EventCalendar from '../SharedComponents/EventCalendar/EventCalendar';
import BasicModal from '../SharedComponents/BasicModal';
import { formatDate } from '../../utils/helperFunctions';
const { REACT_APP_SERVER_URL } = process.env;

function ListEventsPage() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState({});
  const { loading, data } = useQuery(GET_ALL_EVENTS, {
    variables: { country: selectedCountry, region: selectedRegion },
  });

  const handleSelectEvent = (event) => {
    setSelectedEvent(event);
    setModalOpen(true);
  };

  if (loading) return 'Loading..';

  return (
    <div>
      <EventCalendar
        eventData={data}
        handleSelectEvent={handleSelectEvent}
        selectedCountry={selectedCountry}
        setSelectedCountry={setSelectedCountry}
        selectedRegion={selectedRegion}
        setSelectedRegion={setSelectedRegion}
      />
      <BasicModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        {selectedEvent.flyerImageUrl ? (
          <img
            className='flyer-img'
            src={`${REACT_APP_SERVER_URL + selectedEvent.flyerImageUrl}`}
          ></img>
        ) : (
          <div>This event does not have a flyer yet</div>
        )}

        <div>League Name: {selectedEvent.leagueName}</div>
        <div>{selectedEvent.title}</div>
        <div>
          {formatDate(selectedEvent.start, [
            'includeWeekday',
            'includeHour',
            'includeMinute',
          ])}
        </div>
        <div>{selectedEvent.address}</div>
        <Link to={`/event/${selectedEvent.id}`}>
          <div>Click for more Details</div>
        </Link>
      </BasicModal>
    </div>
  );
}

export default ListEventsPage;
