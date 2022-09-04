import React, { useEffect, useState } from 'react';
import { GET_EVENT } from './gql';
import { useQuery } from '@apollo/client';
import { useLocation } from 'react-router-dom';
import ImageUploadModal from '../../SharedComponents/ImageUploadModal/ImageUploadModal';
import CreateEventForm from '../CreateEventForm/CreateEventForm';
import AddBattleToEvent from './AddBattleToEvent/AddBattleToEvent';
import { UpdateEventPageWrapper } from './UpdateEventPage.styles';

function UpdateEventPage() {
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
    <UpdateEventPageWrapper>
      {event ? (
        <div>
          <ImageUploadModal
            type='event flyer'
            object={event}
            refetch={refetch}
          />
          <CreateEventForm event={event} refetch={refetch} type='update' />
          {event?.battles
            ? event.battles.map((battles, i) => (
                <div key={i} className='battle-container'>
                  <div>Battle {i + 1}</div>
                  {battles.battlers.map((battler, i) => (
                    <div key={battler.id}>
                      {battler.name} {i % 2 === 0 ? 'versus' : null}
                    </div>
                  ))}
                </div>
              ))
            : null}
          <AddBattleToEvent event={event} refetch={refetch} />
        </div>
      ) : null}
    </UpdateEventPageWrapper>
  );
}

export default UpdateEventPage;
