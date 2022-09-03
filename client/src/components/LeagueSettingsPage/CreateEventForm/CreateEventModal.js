import React, { useState } from 'react';
import { CreateEventModalWrapper } from './CreateEvent.styles';
import CreateEventForm from './CreateEventForm';
import BasicModal from '../../SharedComponents/BasicModal';

function CreateEventModal({ league, refetch }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [flashMessage, setFlashMessage] = useState('');
  return (
    <CreateEventModalWrapper>
      {flashMessage ? <div>{flashMessage}</div> : null}
      <div onClick={() => setModalOpen(true)}>Create a new event</div>
      <BasicModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateEventForm
          league={league}
          refetch={refetch}
          setModalOpen={setModalOpen}
          setFlashMessage={setFlashMessage}
        />
      </BasicModal>
    </CreateEventModalWrapper>
  );
}

export default CreateEventModal;
