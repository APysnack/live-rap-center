import React, { useState } from 'react';
import CreateLeagueForm from './CreateLeagueForm/CreateLeagueForm';
import CreateAwardForm from './CreateAwardForm/CreateAwardForm';
import AssignAwardForm from './AssignAwardForm/AssignAwardForm';
import AdminOptions from './AdminOptions/AdminOptions.js';

function AdminPanel() {
  const [displayComponent, setDisplayComponent] = useState('options');

  return (
    <>
      <div onClick={() => setDisplayComponent('options')}>
        Back to Buttons Page
      </div>
      <br />
      {displayComponent === 'options' ? (
        <AdminOptions setDisplay={setDisplayComponent} />
      ) : null}
      {displayComponent === 'assignAwards' ? <AssignAwardForm /> : null}
      {displayComponent === 'createAwards' ? <CreateAwardForm /> : null}
      {displayComponent === 'createLeague' ? <CreateLeagueForm /> : null}
    </>
  );
}

export default AdminPanel;
