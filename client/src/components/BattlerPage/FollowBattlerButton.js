import React, { useEffect, useState } from 'react';
import { CREATE_BATTLER_FOLLOW, DELETE_BATTLER_FOLLOW } from './gql';
import { useMutation } from '@apollo/client';

// will eventually need to add in logic/mutation to delete follow
function FollowBattlerButton({ battlerId, currentUser, refetchCurrentUser }) {
  const [flashMessage, setFlashMessage] = useState(null);
  const [userFollowsBattler, setUserFollowsBattler] = useState(false);

  useEffect(() => {
    console.log('test');
    if (currentUser?.followedBattlerIds?.includes(battlerId)) {
      setUserFollowsBattler(true);
    } else {
      setUserFollowsBattler(false);
    }
  }, [currentUser]);

  const [createBattlerFollow] = useMutation(CREATE_BATTLER_FOLLOW, {
    onCompleted: (data) => updateFlashMessage(data, 'create'),
  });

  const [deleteBattlerFollow] = useMutation(DELETE_BATTLER_FOLLOW, {
    onCompleted: (data) => updateFlashMessage(data, 'delete'),
  });

  const updateFlashMessage = (data, type) => {
    refetchCurrentUser();
    if (type === 'create') {
      if (data?.createBattlerFollow) {
        setFlashMessage('Congratulations! You are now following this battler');
      } else {
        setFlashMessage('You already follow this battler');
      }
    } else {
      setFlashMessage('Battler unfollowed!');
    }
  };

  const handleFollowRequest = () => {
    if (userFollowsBattler) {
      deleteBattlerFollow({
        variables: {
          userId: currentUser.id,
          battlerId: battlerId,
        },
      });
    } else {
      createBattlerFollow({
        variables: {
          userId: currentUser.id,
          battlerId: battlerId,
        },
      });
    }
  };
  return (
    <div>
      {flashMessage ? <div>{flashMessage}</div> : null}
      {userFollowsBattler ? (
        <div onClick={handleFollowRequest}>UNFOLLOW THIS BATTLER</div>
      ) : (
        <div onClick={handleFollowRequest}>FOLLOW THIS BATTLER</div>
      )}
    </div>
  );
}

export default FollowBattlerButton;
