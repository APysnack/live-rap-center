import React, { useState, useEffect } from 'react';
import { Delete } from '@mui/icons-material';
import { HomeLeagueWrapper } from './BattlerSettings.styles';
import ConfirmationModal from '../../SharedComponents/ConfirmationModal/ConfirmationModal';
import { DELETE_HOME_LEAGUE_FROM_BATTLER } from './gql';
import { useMutation } from '@apollo/client';
import BattlerSettingsForm from './BattlerSettingsForm/BattlerSettingsForm';
import SettingsGroup from '../../SharedComponents/SettingsGroup/SettingsGroup';

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
    <SettingsGroup height={86} width={25}>
      <div className='header'>Battler Settings</div>
      <div>
        <div className='settings-content'>
          <div className='form-container'>
            <div className='subheading'>Booking Price</div>
            <BattlerSettingsForm user={user} battler={battler} />
          </div>
          <div className='form-container'>
            <div className='subheading'>Leave home league</div>
            {homeLeague ? (
              <HomeLeagueWrapper>
                <div>{homeLeague}</div>
                <Delete onClick={openModal} className='delete' />
              </HomeLeagueWrapper>
            ) : (
              <div>
                <div>No home league.</div>
                <div>You must be invited to join a home league</div>
              </div>
            )}
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={modalOpen}
        onClose={closeModal}
        onConfirm={removeHomeLeague}
        onDeny={closeModal}
      />
    </SettingsGroup>
  );
}

export default BattlerSettings;
