import React from 'react';
import { EventLinkContainer } from './EventLink.styles';
import { formatDate } from '../../../utils/helperFunctions';
import Sell from '@mui/icons-material/Sell';

function EventLink({ event, type = 'view' }) {
  const eventDate = new Date(event.date);

  const eventPath = () => {
    if (type === 'edit') {
      return '/update-event/';
    } else {
      return `/event/${event.id}`;
    }
  };

  const getDate = (type) => {
    const dateArray = formatDate(eventDate, ['short']).split(' ');
    if (type === 'month') {
      return dateArray[0];
    } else {
      return dateArray[1].padStart(2, '0');
    }
  };

  return (
    <EventLinkContainer
      to={eventPath()}
      state={{
        eventId: event.id,
      }}
    >
      <div className='event-container'>
        <div className='date-container'>
          <span className='day-text'>{getDate('day')}</span>
          <span className='month-text'>{getDate('month')}</span>
        </div>

        <div className='event-details-container'>
          <div className='event-name'>{event.name}</div>
          <div>{event.address}</div>
          <div className='icon-box'>
            <Sell style={{ fontSize: '1em' }} />
            {event.admissionCost.toFixed(2)}
          </div>
        </div>
      </div>
    </EventLinkContainer>
  );
}

export default EventLink;
