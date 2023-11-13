import React, { useState } from 'react';
import { UPDATE_ALL_BATTLER_STATS } from '../gql';
import { useMutation } from '@apollo/client';

function UpdateBattlerSettings() {
  const [flash, setFlash] = useState('');

  const [updateAllBattlerStats] = useMutation(UPDATE_ALL_BATTLER_STATS, {
    onCompleted: (data) => {
      setFlash(data.updateAllBattlerStats.message);
    },
    onError: (error) => {
      console.error(error);
    },
  });

  const handleClick = () => {
    try {
      updateAllBattlerStats({ variables: {} });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {flash ? <div>{flash}</div> : null}
      <div
        className='lrc-button'
        style={{
          padding: '0.25em 1em 0.25em 1em',
          gap: '0.5em',
          width: '18em',
        }}
        onClick={() => handleClick()}
      >
        Update All Battler Stats
      </div>
    </div>
  );
}

export default UpdateBattlerSettings;
