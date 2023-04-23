import React, { useEffect, useState } from 'react';
import { CREATE_LEAGUE_INVITATION } from './gql';
import { useMutation } from '@apollo/client';
import BasicModal from '../SharedComponents/BasicModal';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function LeagueOwnerControls({ battler, league, setFlashMessage }) {
  const { user } = useSelector((state) => state.user.userState);

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
            <button
              className='lrc-button'
              style={{ padding: '0.5em', width: '20em' }}
              onClick={sendLeagueInvitation}
            >
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
      <div>
        <Link
          to='/create-booking'
          className='lrc-button'
          style={{ padding: '0.5em', width: '20em' }}
          state={{
            booker: user,
            talent: battler,
            bookingType: 'battler',
          }}
        >
          BOOK THIS BATTLER
        </Link>
      </div>
    </div>
  );
}

export default LeagueOwnerControls;
