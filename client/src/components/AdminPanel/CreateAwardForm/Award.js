import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import ConfirmationModal from '../../SharedComponents/ConfirmationModal/ConfirmationModal';
import { DELETE_AWARD } from './gql';
import { useMutation } from '@apollo/client';

const { REACT_APP_SERVER_URL } = process.env;

function Award({ award, refetch }) {
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteAward] = useMutation(DELETE_AWARD);

  const removeAward = () => {
    deleteAward({
      variables: { awardId: award.id },
      onCompleted: completeDeletion,
    });
  };

  const updateAward = () => {
    console.log('up');
  };

  const completeDeletion = () => {
    setModalOpen(false);
    refetch();
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <div>{award.name}</div>
      <img
        src={REACT_APP_SERVER_URL + award.imageUrl}
        onClick={updateAward}
        width='30'
        height='30'
      />
      <Delete onClick={openModal} className='delete' />
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={removeAward}
        onDeny={closeModal}
      />
    </div>
  );
}

export default Award;
