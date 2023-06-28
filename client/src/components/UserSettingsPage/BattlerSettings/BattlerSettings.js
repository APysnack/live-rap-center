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

  const battlerSettingsForm = () => {
    return <BattlerSettingsForm user={user} battler={battler} />;
  };

  const homeLeagueSettings = () => {
    if (homeLeague) {
      return (
        <HomeLeagueWrapper>
          <div>{homeLeague}</div>
          <Delete onClick={openModal} className='delete' />
        </HomeLeagueWrapper>
      );
    } else {
      return (
        <div>
          <div>No home league.</div>
          <div>You must be invited to join a home league</div>
        </div>
      );
    }
  };

  const settingsProps = {
    header: 'Battler Settings',
    components: [
      { title: 'Booking Price', component: battlerSettingsForm },
      { title: 'Quit Home League', component: homeLeagueSettings },
    ],
  };

  return (
    <SettingsGroup height={86} width={25} settingsProps={settingsProps}>
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
