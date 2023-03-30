import React, { useState } from 'react';
import CreateLeagueForm from './CreateLeagueForm/CreateLeagueForm';
import CreateAwardForm from './CreateAwardForm/CreateAwardForm';
import AssignAwardForm from './AssignAwardForm/AssignAwardForm';
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
      { title: 'Create an award', component: createAwardForm },
      { title: 'Assign an award', component: assignAwardForm },
    ],
  };

  const leagueSettingsProps = {
    header: 'Leagues',
    components: [{ title: 'Add a league', component: createLeagueForm }],
  };

  return (
    <AdminPanelContainer>
      <SettingsGroup
        width={45}
        height={60}
        settingsProps={awardSettingsProps}
      ></SettingsGroup>
      <SettingsGroup
        width={25}
        height={60}
        settingsProps={leagueSettingsProps}
      ></SettingsGroup>
    </AdminPanelContainer>
  );
}

export default AdminPanel;
