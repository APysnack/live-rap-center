import React, { useState } from 'react';
import { ADD_HOME_LEAGUE_TO_BATTLER, DELETE_LEAGUE_INVITATION } from './gql';
import { useMutation } from '@apollo/client';
import InvitationModal from './InvitationModal';

function LeagueInvitations({
  battler,
  potentialLeagues,
  setPotentialLeagues,
  refetchBattler,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const [addLeagueToBattler] = useMutation(ADD_HOME_LEAGUE_TO_BATTLER, {
    onCompleted: refetchBattler,
  });

  const updateViewAfterDelete = () => {
    if (potentialLeagues.length <= 1) {
      setPotentialLeagues(null);
    }
    refetchBattler();
  };

  const [deleteLeagueInvitation] = useMutation(DELETE_LEAGUE_INVITATION, {
    onCompleted: updateViewAfterDelete,
  });

  const acceptLeagueInvitation = (leagueId) => {
    setModalOpen(false);
    setPotentialLeagues(null);
    addLeagueToBattler({
      variables: { leagueId: leagueId, battlerId: battler.id },
    });
  };

  const denyLeagueInvitation = (leagueId) => {
    deleteLeagueInvitation({
      variables: { leagueId: leagueId, battlerId: battler.id },
    });
  };

  return (
    <InvitationModal
      onAccept={acceptLeagueInvitation}
      onDeny={denyLeagueInvitation}
      invitationList={potentialLeagues}
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      type={'league'}
    />
  );
}

export default LeagueInvitations;
