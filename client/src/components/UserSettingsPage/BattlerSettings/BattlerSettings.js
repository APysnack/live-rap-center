import React, { useState, useEffect } from 'react';
import { Delete } from '@mui/icons-material';
import { HomeLeagueWrapper } from './BattlerSettings.styles';
import ConfirmationModal from '../../SharedComponents/ConfirmationModal/ConfirmationModal';
import { DELETE_HOME_LEAGUE_FROM_BATTLER } from './gql';
import { useMutation } from '@apollo/client';
import BattlerSettingsForm from './BattlerSettingsForm/BattlerSettingsForm';

function BattlerSettings({ user, battler }) {
  const [homeLeague, setHomeLeague] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [deleteLeague] = useMutation(DELETE_HOME_LEAGUE_FROM_BATTLER);

  useEffect(() => {
    if (battler?.league?.leagueName) {
      setHomeLeague(battler?.league?.leagueName);
    }
  }, [battler]);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const removeHomeLeague = () => {
    if (user?.id && battler?.id) {
      deleteLeague({
        variables: { battlerId: battler.id },
      });
      closeModal();
      setHomeLeague(null);
    }
  };

  return (
    <div>
      <div>
        {homeLeague ? (
          <HomeLeagueWrapper>
            <div> Home League: {homeLeague}</div>
            <Delete onClick={openModal} className='delete' />
          </HomeLeagueWrapper>
        ) : (
          <div>No home league. You must be invited to join a home league</div>
        )}
        <BattlerSettingsForm user={user} battler={battler} />
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={removeHomeLeague}
        onDeny={closeModal}
      />
    </div>
  );
}

export default BattlerSettings;
