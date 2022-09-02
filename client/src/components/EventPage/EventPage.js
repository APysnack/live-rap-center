import React, { useEffect, useState } from 'react';
import { GET_EVENT } from './gql';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

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
    if (data?.event) {
      setEvent(data.event);
    }
  }, [data]);

  if (loading) return 'Loading...';

  return <div>{event ? <div>EventPage for {event.name}</div> : null}</div>;
}

export default EventPage;
