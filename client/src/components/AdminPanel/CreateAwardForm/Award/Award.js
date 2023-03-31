import React, { useState } from 'react';
import { Delete } from '@mui/icons-material';
import ConfirmationModal from '../../../SharedComponents/ConfirmationModal/ConfirmationModal';
import { DELETE_AWARD } from '../gql';
import { useMutation } from '@apollo/client';
import BasicModal from '../../../SharedComponents/BasicModal';
import UpdateAwardForm from '../UpdateAwardForm.js/UpdateAwardForm';
import { UPDATE_AWARD } from '../gql';
import { AwardContainer } from './Award.styles';

const { REACT_APP_SERVER_URL } = process.env;

// AwardTypeEnum must match acceptedTypeValues, including the order
const AwardTypeEnum = {
  BATTLER: 'BATTLER',
  VOTER: 'VOTER',
  LEAGUE: 'LEAGUE',
};

function Award({ award, refetch }) {
  const [uploadImageModalOpen, setUploadImageModalOpen] = useState(false);
  const [editAwardModalOpen, setEditAwardModalOpen] = useState(false);

  const [deleteAward] = useMutation(DELETE_AWARD);
  const [updateAward] = useMutation(UPDATE_AWARD);

  const removeAward = () => {
    deleteAward({
      variables: { awardId: award.id },
      onCompleted: completeDeletion,
    });
  };

  const editAward = (value) => {
    let enumValue;
    if (value.awardType === 'battler_award') {
      enumValue = AwardTypeEnum.BATTLER;
    } else if (value.awardType === 'voter_award') {
      enumValue = AwardTypeEnum.VOTER;
    } else if (value.awardType === 'league_award') {
      enumValue = AwardTypeEnum.LEAGUE;
    } else {
      enumValue = null;
    }
    if (enumValue !== null && value.awardName !== '') {
      updateAward({
        variables: {
          awardId: award.id,
          awardName: value.awardName,
          awardType: enumValue,
        },
        onCompleted: completeEdit,
      });
    }
  };

  const completeDeletion = () => {
    setUploadImageModalOpen(false);
    refetch();
  };

  const completeEdit = () => {
    setEditAwardModalOpen(false);
    refetch();
  };

  const openModal = () => {
    setUploadImageModalOpen(true);
  };

  const closeModal = () => {
    setUploadImageModalOpen(false);
  };
  return (
    <AwardContainer>
      <div className='award-name'>{award.name}</div>
      <div className='award-icon-container'>
        <img
          src={REACT_APP_SERVER_URL + award.imageUrl}
          onClick={() => setEditAwardModalOpen(true)}
          width='40'
          height='40'
        />
        <Delete onClick={openModal} className='delete' />
      </div>

      <ConfirmationModal
        isOpen={uploadImageModalOpen}
        onClose={closeModal}
        onConfirm={removeAward}
        onDeny={closeModal}
      />
      <BasicModal
        isOpen={editAwardModalOpen}
        onClose={() => setEditAwardModalOpen(false)}
      >
        <UpdateAwardForm award={award} onSubmit={(value) => editAward(value)} />
      </BasicModal>
    </AwardContainer>
  );
}

export default Award;
