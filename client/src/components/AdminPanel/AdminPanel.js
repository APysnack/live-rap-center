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
      { title: 'Assign an award', component: assignAwardForm },
      { title: 'Create an award', component: createAwardForm },
    ],
  };

  const leagueSettingsProps = {
    header: 'Leagues',
    components: [{ title: 'Add a league', component: createLeagueForm }],
  };

  return (
    <AdminPanelContainer>
      <SettingsGroup
        width={35}
        height={80}
        scrollEnabled={true}
        settingsProps={awardSettingsProps}
        shadowHeight={65}
        shadowWidth={30}
      ></SettingsGroup>
      <SettingsGroup
        width={25}
        height={80}
        settingsProps={leagueSettingsProps}
      ></SettingsGroup>
    </AdminPanelContainer>
  );
}

export default AdminPanel;
