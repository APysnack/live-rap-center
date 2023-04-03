import React, { useEffect, useState } from 'react';
import { CREATE_LEAGUE_INVITATION } from './gql';
import { useMutation } from '@apollo/client';
import BasicModal from '../SharedComponents/BasicModal';

function LeagueOwnerControls({ battler, league, setFlashMessage }) {
  const [createLeagueInvitation, { data: invitationData }] = useMutation(
    CREATE_LEAGUE_INVITATION
  );
  const [modalOpen, setModalOpen] = useState(false);

  const sendLeagueInvitation = () => {
    if (league?.id && battler.id) {
      createLeagueInvitation({
        variables: {
          leagueId: league.id,
          battlerId: battler.id,
        },
      });
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (invitationData) {
      if (invitationData.createLeagueInvitation) {
        setFlashMessage('League Invitation Sent!');
      } else {
        setFlashMessage(
          "You've already extended an invitation to this battler"
        );
      }
    }
  }, [invitationData]);

  return (
    <div>
      {battler?.user?.isVerified ? (
        <div>
          {battler?.league?.leagueName ? (
            <div>This battler already has a home league</div>
          ) : (
            <button className='lrc-button' onClick={sendLeagueInvitation}>
              ADD THIS BATTLER TO YOUR LEAGUE
            </button>
          )}
        </div>
      ) : (
        <div>
          This battler does not have an account with LRC. Are you this battler?
          Sign up for LRC today to set your booking price, join home leagues,
          and more!
        </div>
      )}
      <BasicModal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <div>
          You need to be logged in to do this. Sign up for an account today
        </div>
      </BasicModal>
    </div>
  );
}

export default LeagueOwnerControls;
