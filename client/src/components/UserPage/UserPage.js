import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER_BATTLER, GET_USER } from './gql';
import { useQuery } from '@apollo/client';
import BattlerInfo from './BattlerInfo';
import { Link } from 'react-router-dom';
import { UserPageContainer } from './UserPage.styles';
import BattleRow from './BattleRow/BattleRow';
import UserInfo from './UserInfo';
import NewsContainer from './NewsContainer';

function UserPage({ callLogoutUser, cable }) {
  // current redux state of the user
  const { user } = useSelector((state) => state.user.userState);
  const [battler, setBattler] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const {
    loading,
    data: userData,
    refetch: refetchUser,
  } = useQuery(GET_USER, {
    skip: user?.id ? false : true,
    variables: { id: user?.id },
  });

  const { data: battlerData, refetch: refetchBattler } = useQuery(
    GET_USER_BATTLER,
    {
      skip: currentUser?.id ? false : true,
      variables: { userId: currentUser?.id },
    }
  );

  useEffect(() => {
    if (battlerData?.battler) {
      setBattler(battlerData.battler);
    }
  }, [battlerData]);

  useEffect(() => {
    if (userData?.user) {
      setCurrentUser(userData.user);
    }
  }, [userData]);

  if (loading) return 'Loading...';

  return (
    <UserPageContainer>
      {currentUser ? (
        <div>
          <div className='primary-content-container'>
            <div className='user-content-container'>
              <UserInfo
                currentUser={currentUser}
                user={user}
                battler={battler}
                refetchUser={refetchUser}
                refetchBattler={refetchBattler}
              />
              {battler?.name ? (
                <BattlerInfo
                  battler={battler}
                  refetchBattler={refetchBattler}
                />
              ) : null}
              <NewsContainer
                currentUser={currentUser}
                battler={battler}
                refetchUser={refetchUser}
                refetchBattler={refetchBattler}
                cable={cable}
              />
            </div>

            <BattleRow type='topBattles' />
            <BattleRow type='followedBattles' userId={currentUser.id} />
          </div>

          <div className='link-container'>
            <Link to='/spaces'>Link to Spaces</Link>
          </div>
          <button
            className='lrc-button'
            style={{
              padding: '0.25em 1em 0.25em 1em',
              width: '10em',
            }}
            onClick={callLogoutUser}
          >
            Log out
          </button>
        </div>
      ) : (
        <div>no user</div>
      )}
    </UserPageContainer>
  );
}

export default UserPage;
