import React, { useState, useEffect } from 'react';
import BasicModal from '../SharedComponents/BasicModal';
import {
  LeagueInvitationContainer,
  InviteNotificationContainer,
} from './LeagueInvitations.styles';
import { ADD_HOME_LEAGUE_TO_BATTLER, DELETE_LEAGUE_INVITATION } from './gql';
import { useMutation } from '@apollo/client';
import { MarkEmailUnread as InviteNotification } from '@mui/icons-material';

function LeagueInvitations({
  battler,
  potentialLeagues,
  setPotentialLeagues,
  refetchBattler,
}) {
  const [modalOpen, setModalOpen] = useState(false);

  const [addLeagueToBattler, { data: addHomeLeagueData }] = useMutation(
    ADD_HOME_LEAGUE_TO_BATTLER,
    { onCompleted: refetchBattler }
  );

  const updateViewAfterDelete = () => {
    if (potentialLeagues.length <= 1) {
      setPotentialLeagues(null);
    }
    refetchBattler();
  };

  const [deleteLeagueInvitation, { data: deleteLeagueData }] = useMutation(
    DELETE_LEAGUE_INVITATION,
    { onCompleted: updateViewAfterDelete }
  );

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
    <InviteNotificationContainer>
      {potentialLeagues?.length > 0 ? (
        <div className='invite-icon' onClick={() => setModalOpen(true)}>
          <InviteNotification
            className='invite-notification'
            fontSize='large'
          />
          <div>You have league invites</div>
        </div>
      ) : (
        <div>You currently do not have any league invitations</div>
      )}
      <BasicModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div>Pending League Invitations</div>
        {potentialLeagues.map((league) => (
          <LeagueInvitationContainer key={league.id}>
            <div>{league.leagueName}</div>
            <button onClick={() => acceptLeagueInvitation(league.id)}>
              Accept
            </button>
            <button onClick={() => denyLeagueInvitation(league.id)}>
              Deny
            </button>
          </LeagueInvitationContainer>
        ))}
      </BasicModal>
    </InviteNotificationContainer>
  );
}

export default LeagueInvitations;
