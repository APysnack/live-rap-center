import React, { useState, useEffect } from 'react';
import ImageUploadModal from '../SharedComponents/ImageUploadModal/ImageUploadModal';
import SocialMediaContainer from '../SharedComponents/SocialMediaContainer/SocialMediaContainer';
import ContentStyleWrapper from '../SharedComponents/ContentContainer/ContentStyleWrapper';
import { NotificationsContainer } from './UserPage.styles';

function UserInfo({ currentUser, user, refetchUser, battler, refetchBattler }) {
  return (
    <ContentStyleWrapper width={'20vw'}>
      <div>
        <div className='user-name-image'>
          <div className='username'>{currentUser.username}</div>
          <ImageUploadModal
            type='profile picture'
            refetch={refetchUser}
            object={currentUser}
          />
        </div>
        {Object.keys(user?.socials).length > 0 ? (
          <SocialMediaContainer socials={currentUser.socialMediaLinks} />
        ) : null}
      </div>
    </ContentStyleWrapper>
  );
}

export default UserInfo;
