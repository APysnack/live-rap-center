import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GET_USER_BATTLER, GET_USER } from './gql';
import { useQuery } from '@apollo/client';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import SocialMediaContainer from '../SharedComponents/SocialMediaContainer/SocialMediaContainer';
import BattlerInfo from './BattlerInfo';
import TopBattles from './TopBattles/TopBattles';
import { Link } from 'react-router-dom';
import { UserInfo, PrimaryContentContainer } from './UserPage.styles';
import FollowedBattles from './FollowedBattles/FollowedBattles';

function UserPage({ callLogoutUser }) {
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
    <>
      {currentUser ? (
        <div>
          <PrimaryContentContainer>
            <UserInfo>
              <div>Username: {currentUser.username}</div>
              <ImageUploadModal
                type='profile picture'
                refetch={refetchUser}
                object={currentUser}
              />
              {Object.keys(user?.socials).length > 0 ? (
                <SocialMediaContainer socials={user.socials} />
              ) : null}
            </UserInfo>
            {battler?.name ? (
              <BattlerInfo battler={battler} refetchBattler={refetchBattler} />
            ) : null}
            <TopBattles />
            <FollowedBattles userId={currentUser.id} />
          </PrimaryContentContainer>

          {user.crew_chat_ids?.length > 0
            ? user.crew_chat_ids.map((chatId) => (
                <Link
                  key={chatId}
                  to='/crew-chat'
                  state={{
                    crewId: chatId,
                    crewName: 'Crew Chat',
                  }}
                >
                  Crew Chat
                </Link>
              ))
            : 'bar'}

          <div>G: Active Twitter Spaces??</div>
          <div>B: Rank</div>
          <div>
            Alerts for Booking requests but needs to be more elaborate with
            immediate chat available
          </div>
          <div>
            B: Calendar for my upcoming events? Available to be booked, etc.
          </div>

          <button style={{ color: 'red' }} onClick={callLogoutUser}>
            Log out
          </button>
        </div>
      ) : (
        <div>no user</div>
      )}
    </>
  );
}

export default UserPage;
