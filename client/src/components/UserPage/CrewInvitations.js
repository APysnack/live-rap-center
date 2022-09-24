import React, { useState } from 'react';
import InvitationModal from './InvitationModal';
import { useMutation } from '@apollo/client';
import { ADD_CREW_TO_USER, DELETE_CREW_INVITATION } from './gql';

function CrewInvitations({
  user,
  potentialCrews,
  setPotentialCrews,
  refetchUser,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const [addCrewToUser] = useMutation(ADD_CREW_TO_USER, {
    onCompleted: refetchUser,
  });

  const updateViewAfterDelete = () => {
    if (potentialCrews.length <= 1) {
      setPotentialCrews(null);
    }
    refetchUser();
  };

  const [deleteCrewInvitation] = useMutation(DELETE_CREW_INVITATION, {
    onCompleted: updateViewAfterDelete,
  });

  const acceptCrewInvitation = (crewId) => {
    setModalOpen(false);
    setPotentialCrews(null);
    addCrewToUser({
      variables: { crewId: crewId, userId: user.id },
    });
  };

  const denyCrewInvitation = (crewId) => {
    deleteCrewInvitation({
      variables: { crewId: crewId, userId: user.id },
    });
  };

  return (
    <InvitationModal
      onAccept={acceptCrewInvitation}
      onDeny={denyCrewInvitation}
      invitationList={potentialCrews}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      type={'crew'}
    />
  );
}

export default CrewInvitations;
