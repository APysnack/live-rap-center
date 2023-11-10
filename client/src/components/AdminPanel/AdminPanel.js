import React, { useState } from 'react';
import CreateLeagueForm from './CreateLeagueForm/CreateLeagueForm';
import CreateAwardForm from './CreateAwardForm/CreateAwardForm';
import AssignAwardForm from './AssignAwardForm/AssignAwardForm';
import UpdateBattlerSettings from './UpdateBattlerSettings/UpdateBattlerSettings';
import SettingsGroup from '../SharedComponents/SettingsGroup/SettingsGroup';
import { AdminPanelContainer } from './AdminPanel.styles';

function AdminPanel() {
  const assignAwardForm = () => {
    return <AssignAwardForm />;
  };

  const createAwardForm = () => {
    return <CreateAwardForm />;
  };

  const createLeagueForm = () => {
    return <CreateLeagueForm />;
  };

  const awardSettingsProps = {
    header: 'Awards',
    components: [
      {
        title: 'Assign award to Battler/Voter/League ID',
        component: assignAwardForm,
      },
      {
        title: '',
        component: createAwardForm,
        scrollEnabled: true,
      },
    ],
  };

  const leagueSettingsProps = {
    header: 'Leagues',
    components: [
      {
        title: 'Add a league',
        component: createLeagueForm,
        scrollEnabled: true,
      },
    ],
  };

  const updateBattlerStatsProps = {
    header: 'Battler Stats',
    components: [
      {
        title: 'Update battler stats',
        component: UpdateBattlerSettings,
        scrollEnabled: false,
      },
    ],
  };

  return (
    <AdminPanelContainer>
      <SettingsGroup
        width={25}
        height={80}
        settingsProps={leagueSettingsProps}
      ></SettingsGroup>
      <SettingsGroup
        width={32}
        height={80}
        settingsProps={awardSettingsProps}
        shadowHeight={65}
        shadowWidth={30}
      ></SettingsGroup>
      <SettingsGroup
        width={25}
        height={80}
        settingsProps={updateBattlerStatsProps}
      ></SettingsGroup>
    </AdminPanelContainer>
  );
}

export default AdminPanel;
