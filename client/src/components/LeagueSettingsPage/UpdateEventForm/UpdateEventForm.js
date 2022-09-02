import React, { useEffect, useState } from 'react';
import { GET_EVENT } from './gql';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import ImageUploadModal from '../../SharedComponents/ImageUploadModal/ImageUploadModal';

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
      <div onClick={() => refetch()}>test ne</div>
      {event ? (
        <div>
          <ImageUploadModal
            type='event flyer'
            object={event}
            refetch={refetch}
          />
        </div>
      ) : null}
    </div>
  );
}

export default UpdateEventForm;
