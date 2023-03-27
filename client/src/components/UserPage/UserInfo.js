import React, { useState, useEffect } from 'react';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import SocialMediaContainer from '../SharedComponents/SocialMediaContainer/SocialMediaContainer';
import LeagueInvitations from './LeagueInvitations';
import CrewInvitations from './CrewInvitations';
import ContentStyleWrapper from '../SharedComponents/ContentContainer/ContentStyleWrapper';

function UserInfo({ currentUser, user, refetchUser, battler, refetchBattler }) {
  const [potentialLeagues, setPotentialLeagues] = useState();
  const [potentialCrews, setPotentialCrews] = useState();

  useEffect(() => {
    if (battler?.potentialLeagues) {
      setPotentialLeagues(battler.potentialLeagues);
    }
  }, [battler]);

  useEffect(() => {
    console.log(currentUser.socialMediaLinks);
    if (currentUser?.potentialCrews) {
      setPotentialCrews(currentUser.potentialCrews);
    }
  }, [currentUser]);

  return (
    <ContentStyleWrapper width={800} height={400}>
      <div className='user-name-image'>
        <div>{currentUser.username}</div>
        <ImageUploadModal
          type='profile picture'
          refetch={refetchUser}
          object={currentUser}
        />
      </div>

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
        <SocialMediaContainer socials={currentUser.socialMediaLinks} />
      ) : null}
    </ContentStyleWrapper>
  );
}

export default UserInfo;
