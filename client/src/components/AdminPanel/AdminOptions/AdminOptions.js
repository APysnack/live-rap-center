import React from 'react';
import { AdminOptionsWrapper } from './AdminOptions.styles';

function AdminOptions({ setDisplay }) {
  return (
    <AdminOptionsWrapper>
      <div className='btn' onClick={() => setDisplay('createAwards')}>
        Create Awards
      </div>
      <div className='btn' onClick={() => setDisplay('assignAwards')}>
        Assign Awards
      </div>
      <div className='btn' onClick={() => setDisplay('createLeague')}>
        Create League
      </div>
    </AdminOptionsWrapper>
  );
}

export default AdminOptions;
