import React, { useEffect, useState } from 'react';
import { GET_BATTLER } from './gql';
import { useQuery } from '@apollo/client';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import SocialMediaForm from './SocialMediaForm/SocialMediaForm';
import BattlerSettings from './BattlerSettings/BattlerSettings';
import CreateCrewForm from './CreateCrewForm/CreateCrewForm';
import LocationSelector from '../SharedComponents/LocationSelector/LocationSelector';
import ThemeSelector from './ThemeSelector/ThemeSelector';

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
    <div>
      UserSettingsPage
      <CreateCrewForm user={currentUser} />
      <ImageUploadModal
        type='profile picture'
        object={currentUser}
        refetch={refetchUser}
      />
      {battler ? (
        <BattlerSettings user={currentUser} battler={battler} />
      ) : null}
      <SocialMediaForm currentUser={currentUser} refetchUser={refetchUser} />
      <LocationSelector
        object={currentUser}
        refetch={refetchUser}
        type='user'
      />
      <ThemeSelector user={currentUser} refetchUser={refetchUser} />
    </div>
  );
}

export default UserSettingsPage;
