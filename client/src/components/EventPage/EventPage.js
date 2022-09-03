import React, { useEffect, useState } from 'react';
import { GET_EVENT } from './gql';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { EventPageWrapper } from './EventPage.styles';
import { formatDate } from '../../utils/helperFunctions';

const { REACT_APP_SERVER_URL } = process.env;

function EventPage() {
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);

  const { loading, data, refetch } = useQuery(GET_EVENT, {
    variables: { id: eventId },
    options: {
      awaitRefetchQueries: true,
    },
  });

  useEffect(() => {
    console.log(REACT_APP_SERVER_URL + data?.event?.flyerImageUrl);
    if (data?.event) {
      setEvent(data.event);
    }
  }, [data]);

  if (loading) return 'Loading...';

  return (
    <EventPageWrapper>
      {event ? (
        <div>
          <div>League: {event.league.leagueName}</div>
          <div>Name: {event.name}</div>
          <div>Location: {event.address}</div>
          <div>Admission: {`$${event.admissionCost}`}</div>
          <div>
            Date:{' '}
            {formatDate(event.date, [
              'includeWeekday',
              'includeHour',
              'includeMinute',
            ])}
          </div>
          <img
            className='flyer-img'
            src={
              event.flyerImageUrl
                ? `${REACT_APP_SERVER_URL + event.flyerImageUrl}`
                : 'https://image.shutterstock.com/image-vector/image-not-found-grayscale-photo-260nw-1737334631.jpg'
            }
          ></img>
        </div>
      ) : null}
    </EventPageWrapper>
  );
}

export default EventPage;
