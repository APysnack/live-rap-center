import React, { useState, useEffect } from 'react';
import { UserInfoContainer } from './UserInfo.styles';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import SocialMediaContainer from '../SharedComponents/SocialMediaContainer/SocialMediaContainer';
import LeagueInvitations from './LeagueInvitations';
import CrewInvitations from './CrewInvitations';

function UserInfo({ currentUser, user, refetchUser, battler, refetchBattler }) {
  const [potentialLeagues, setPotentialLeagues] = useState();
  const [potentialCrews, setPotentialCrews] = useState();

  useEffect(() => {
    if (battler?.potentialLeagues) {
      setPotentialLeagues(battler.potentialLeagues);
    }
  }, [battler]);

  useEffect(() => {
    if (currentUser?.potentialCrews) {
      setPotentialCrews(currentUser.potentialCrews);
    }
  }, [currentUser]);

  return (
    <UserInfoContainer>
      <div>Username: {currentUser.username}</div>
      <ImageUploadModal
        type='profile picture'
        refetch={refetchUser}
        object={currentUser}
      />
      {potentialLeagues?.length > 0 ? (
        <LeagueInvitations
          battler={battler}
          potentialLeagues={potentialLeagues}
          setPotentialLeagues={setPotentialLeagues}
          refetchBattler={refetchBattler}
        />
      ) : null}
      <CrewInvitations
        user={currentUser}
        potentialCrews={potentialCrews}
        setPotentialCrews={setPotentialCrews}
        refetchUser={refetchUser}
      />
      {Object.keys(user?.socials).length > 0 ? (
        <SocialMediaContainer socials={user.socials} />
      ) : null}
    </UserInfoContainer>
  );
}

export default UserInfo;