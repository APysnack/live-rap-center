import React from 'react';
import { EventLinkContainer } from './EventLink.styles';
import { Avatar } from '@mui/material';
import { formatDate } from '../../../utils/helperFunctions';

const { REACT_APP_SERVER_URL } = process.env;
const THUMBNAIL_WIDTH = 100;
const THUMBNAIL_HEIGHT = 100;

function EventLink({ event, type = 'view' }) {
  const eventDate = new Date(event.date);

  const eventPath = () => {
    if (type === 'edit') {
      return '/update-event/';
    } else {
      return `/event/${event.id}`;
    }
  };

  return (
    <EventLinkContainer
      to={eventPath()}
      state={{
        eventId: event.id,
      }}
    >
      {event.flyerImageUrl ? (
        <Avatar
          src={REACT_APP_SERVER_URL + event.flyerImageUrl}
          sx={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }}
          className='eventFlyer'
        />
      ) : (
        <Avatar
          src={null}
          sx={{ width: THUMBNAIL_WIDTH, height: THUMBNAIL_HEIGHT }}
          className='eventFlyer'
        />
      )}
      <div>{event.name}</div>
      <div>{formatDate(eventDate, ['includeWeekday'])}</div>
    </EventLinkContainer>
  );
}

export default EventLink;
