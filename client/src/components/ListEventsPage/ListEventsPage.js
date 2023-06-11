import React, { useState } from 'react';
import { GET_ALL_EVENTS } from './gql';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import EventCalendar from '../SharedComponents/EventCalendar/EventCalendar';
import BasicModal from '../SharedComponents/BasicModal';
import { formatDate } from '../../utils/helperFunctions';
import { EventInfoContainer } from './ListEventsPages.styles';
import CalendarMonth from '@mui/icons-material/CalendarMonth';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Payments from '@mui/icons-material/Payments';

function ListEventsPage() {
  const [selectedCountry, setSelectedCountry] = useState('United States');
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
      <BasicModal
        width={800}
        height={700}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <EventInfoContainer>
          <div className='header-container'>{selectedEvent.leagueName}</div>
          <Link className='link-container' to={`/event/${selectedEvent.id}`}>
            {selectedEvent.flyerImageUrl ? (
              <img
                className='flyer-img'
                src={`${selectedEvent.flyerImageUrl}`}
                width={'300px'}
              ></img>
            ) : (
              <div className='flyer-img'>This event does not have a flyer</div>
            )}
            <div className='subheading'>{selectedEvent.title}</div>
            <div className='details-container'>
              <div className='icon-container'>
                <LocationOnIcon />
                <div className='subtext'>{selectedEvent.address}</div>
              </div>

              <div className='bottom-row'>
                <div className='icon-container address'>
                  <CalendarMonth />
                  <div className='subtext'>
                    {formatDate(selectedEvent.start, [
                      'includeWeekday',
                      'includeHour',
                      'includeMinute',
                    ])}
                  </div>
                </div>

                <div className='icon-container admission'>
                  <Payments />
                  <div className='subtext'>{selectedEvent.admissionCost}</div>
                </div>
              </div>
            </div>
          </Link>
        </EventInfoContainer>
      </BasicModal>
    </div>
  );
}

export default ListEventsPage;
