import React, { useState } from 'react';
import { CreateEventModalWrapper } from './CreateEvent.styles';
import CreateEventForm from './CreateEventForm';
import BasicModal from '../../SharedComponents/BasicModal';

function CreateEventModal({ league, refetch }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <CreateEventModalWrapper>
      <div
        className='lrc-button'
        style={{ padding: '0.5em', width: '20%', marginBottom: '1.2em' }}
        onClick={() => setModalOpen(true)}
      >
        Add New Event
      </div>
      <BasicModal
        width={1100}
        height={750}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      >
        <CreateEventForm
          league={league}
          refetch={refetch}
          setModalOpen={setModalOpen}
        />
      </BasicModal>
    </CreateEventModalWrapper>
  );
}

export default CreateEventModal;
