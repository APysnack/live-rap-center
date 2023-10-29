import React, { useEffect, useState } from 'react';
import { GET_BATTLER } from './gql';
import { useQuery } from '@apollo/client';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import SocialMediaForm from './SocialMediaForm/SocialMediaForm';
import BattlerSettings from './BattlerSettings/BattlerSettings';
import CreateCrewForm from './CreateCrewForm/CreateCrewForm';
import UserSettings from './UserSettingsForm/UserSettings';
import { UserSettingsPageContainer } from './UserSettingsPage.styles';
import ContentContainer from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import Loading from '../SharedComponents/Loading/Loading';

function UserSettingsPage({ user, loading, refetchUser }) {
  const [battler, setBattler] = useState(null);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const { data } = useQuery(GET_BATTLER, {
    skip: currentUser?.id ? false : true,
    variables: { id: currentUser?.id },
  });

  useEffect(() => {
    if (data?.battler) {
      setBattler(data.battler);
    }
  }, [data]);

  if (loading) return <Loading />;

  return (
    <UserSettingsPageContainer>
      <div className='content-wrapper'>
        <div className='cc-wrapper'>
          <ContentContainer
            width={520}
            height={180}
            justifyContent={'flex-start'}
          >
            <div className='name-and-photo-container'>
              <ImageUploadModal
                type='profile picture'
                object={currentUser}
                refetch={refetchUser}
              />
              <div className='username-container'>
                <div className='username'>
                  {currentUser?.username.toUpperCase()}
                </div>
                {currentUser?.roles?.length > 0 ? (
                  <div className='roles-grid'>
                    {currentUser.roles.map((role) => (
                      <div className='role'>{role.name.toUpperCase()}</div>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </ContentContainer>
          <SocialMediaForm
            currentUser={currentUser}
            refetchUser={refetchUser}
          />
        </div>
        <div className='cc-wrapper'>
          <UserSettings user={currentUser} refetchUser={refetchUser} />

          <CreateCrewForm user={currentUser} />
        </div>
        <div className='cc-wrapper'>
          {battler ? (
            <BattlerSettings user={currentUser} battler={battler} />
          ) : null}
        </div>
      </div>
    </UserSettingsPageContainer>
  );
}

export default UserSettingsPage;
