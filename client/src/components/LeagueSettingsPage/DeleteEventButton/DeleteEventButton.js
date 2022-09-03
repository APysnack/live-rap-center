import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_EVENT } from '../../SharedComponents/EventLink/gql';

function DeleteEventButton({ event, refetch }) {
  const [deleteEvent] = useMutation(DELETE_EVENT);

  const removeEvent = () => {
    deleteEvent({
      variables: { eventId: event.id },
      onCompleted: refetch,
    });
  };

  return <div onClick={removeEvent}>DeleteEventButton</div>;
}

export default DeleteEventButton;
