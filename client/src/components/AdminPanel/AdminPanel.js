import React from 'react';
import CreateLeagueForm from './CreateLeagueForm/CreateLeagueForm';
import CreateAwardForm from './CreateAwardForm/CreateAwardForm';

function AdminPanel() {
  return (
    <>
      <CreateAwardForm />
      <CreateLeagueForm />
    </>
  );
}

export default AdminPanel;
