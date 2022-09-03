import React, { useEffect, useState } from 'react';
import { GET_EVENT } from './gql';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import ImageUploadModal from '../../SharedComponents/ImageUploadModal/ImageUploadModal';
import CreateEventForm from '../CreateEventForm/CreateEventForm';

function UpdateEventForm() {
  const [event, setEvent] = useState(null);

  const location = useLocation();
  const { eventId } = location.state || {};

  const { loading, data, refetch, error } = useQuery(GET_EVENT, {
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

  return (
    <div>
      {event ? (
        <div>
          <ImageUploadModal
            type='event flyer'
            object={event}
            refetch={refetch}
          />
          <CreateEventForm event={event} refetch={refetch} type='update' />
        </div>
      ) : null}
    </div>
  );
}

export default UpdateEventForm;
