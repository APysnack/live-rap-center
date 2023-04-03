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
import SettingsGroup from '../SharedComponents/SettingsGroup/SettingsGroup';

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

  if (loading) return 'Loading...';

  return (
    <UserSettingsPageContainer>
      <div className='content-wrapper'>
        <div>
          <ContentContainer
            width={520}
            height={180}
            justifyContent={'flex-start'}
          >
            <ImageUploadModal
              type='profile picture'
              object={currentUser}
              refetch={refetchUser}
            />
            <div>{currentUser?.username}</div>
          </ContentContainer>
          <SocialMediaForm
            currentUser={currentUser}
            refetchUser={refetchUser}
          />
        </div>
        <div>
          <UserSettings user={currentUser} refetchUser={refetchUser} />

          <CreateCrewForm user={currentUser} />
        </div>
        {battler ? (
          <BattlerSettings user={currentUser} battler={battler} />
        ) : null}
      </div>
    </UserSettingsPageContainer>
  );
}

export default UserSettingsPage;
