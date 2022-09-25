import React, { useEffect, useState } from 'react';
import { CREATE_LEAGUE_INVITATION, GET_USER_LEAGUE } from './gql';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import BasicModal from '../SharedComponents/BasicModal';

function LeagueOwnerControls({ battler, leagueOwner, setFlashMessage }) {
  const [league, setLeague] = useState(null);
  const [createLeagueInvitation, { data: invitationData }] = useMutation(
    CREATE_LEAGUE_INVITATION
  );
  const [modalOpen, setModalOpen] = useState(false);

  const { loading, data: leagueData } = useQuery(GET_USER_LEAGUE, {
    skip: !leagueOwner?.league_ids,
    variables: { id: leagueOwner?.league_ids[0] },
  });

  const sendLeagueInvitation = () => {
    if (leagueOwner != null) {
      if (league?.id && battler.id) {
        createLeagueInvitation({
          variables: {
            leagueId: league.id,
            battlerId: battler.id,
          },
        });
      }
    } else {
      setModalOpen(true);
    }
  };

  useEffect(() => {
    if (leagueData?.league) {
      setLeague(leagueData.league);
    }
  }, [leagueData]);

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

  if (loading) return 'Loading...';

  return (
    <div>
      {battler?.user?.isVerified ? (
        <div>
          {battler?.league?.leagueName ? (
            <div>This battler already has a home league</div>
          ) : (
            <button onClick={sendLeagueInvitation}>
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
