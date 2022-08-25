import React, { useState } from 'react';
import { CREATE_BATTLER_FOLLOW } from './gql';
import { useMutation } from '@apollo/client';

// will eventually need to add in logic/mutation to delete follow
function FollowBattlerButton({ battlerId, userId }) {
  const [flashMessage, setFlashMessage] = useState(null);

  const [createBattlerFollow] = useMutation(CREATE_BATTLER_FOLLOW, {
    onCompleted: (data) => updateFlashMessage(data),
  });

  const updateFlashMessage = (data) => {
    if (data?.createBattlerFollow) {
      setFlashMessage('Congratulations! You are now following this battler');
    } else {
      setFlashMessage('You already follow this battler');
    }
  };

  const handleFollowRequest = () => {
    createBattlerFollow({
      variables: {
        userId: userId,
        battlerId: battlerId,
      },
    });
  };
  return (
    <div>
      {flashMessage ? <div>{flashMessage}</div> : null}
      <div onClick={handleFollowRequest}>FOLLOW THIS BATTLER</div>
    </div>
  );
}

export default FollowBattlerButton;
