import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER_BATTLER, GET_USER } from './gql';
import { useQuery } from '@apollo/client';
import BattlerInfo from './BattlerInfo';
import TopBattles from './TopBattles/TopBattles';
import { Link } from 'react-router-dom';
import { UserPageContainer } from './UserPage.styles';
import FollowedBattles from './FollowedBattles/FollowedBattles';
import UserInfo from './UserInfo';
import ChatDropDown from './ChatDropDown/ChatDropDown';

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
      <div>hello</div>
      {currentUser ? (
        <div>
          <div className='primary-content-container'>
            <UserInfo
              currentUser={currentUser}
              user={user}
              battler={battler}
              refetchUser={refetchUser}
              refetchBattler={refetchBattler}
            />
            {battler?.name ? (
              <BattlerInfo battler={battler} refetchBattler={refetchBattler} />
            ) : null}
            <TopBattles />
            <FollowedBattles userId={currentUser.id} />
          </div>

          <div className='link-container'>
            <Link to='/spaces'>Link to Spaces</Link>

            {currentUser.crews?.length > 0
              ? currentUser.crews.map((crew) => (
                  <Link
                    key={crew.crewChatId}
                    to='/crew-chat'
                    state={{
                      crewId: crew.crewChatId,
                      crewName: 'Crew Chat',
                    }}
                  >
                    {crew.name}
                  </Link>
                ))
              : 'bar'}
          </div>

          <ChatDropDown currentUser={currentUser} cable={cable} />

          <div>B: Rank</div>
          <div>
            Alerts for Booking requests but needs to be more elaborate with
            immediate chat available
          </div>
          <button style={{ color: 'red' }} onClick={callLogoutUser}>
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
