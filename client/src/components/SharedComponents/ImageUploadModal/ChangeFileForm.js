import React, { useState, useEffect } from 'react';
import BasicModal from '../BasicModal';
import { useMutation } from '@apollo/client';
import {
  CREATE_LEAGUE_LOGO,
  CREATE_USER_PROFILE_PICTURE,
  UPDATE_BATTLE_THUMBNAIL,
  UPDATE_BATTLER_IMAGE,
  CREATE_AWARD,
} from './gql';
import Dropzone from './Dropzone';

function ChangeFileForm({ isOpen, onClose, type, refetch, object }) {
  const [fileName, setFileName] = useState('Choose File');

  const [createLeagueLogo, { data: leagueLogoData }] =
    useMutation(CREATE_LEAGUE_LOGO);

  const [createUserProfilePicture, { data: userProfilePicData }] = useMutation(
    CREATE_USER_PROFILE_PICTURE
  );

  const [updateBattleThumbnail, { data: battleThumbnailData }] = useMutation(
    UPDATE_BATTLE_THUMBNAIL
  );

  const [updateBattlerImage, { data: battlerImageData }] =
    useMutation(UPDATE_BATTLER_IMAGE);

  const [createAward, { data: awardData }] = useMutation(CREATE_AWARD);

  const onSubmit = async (file) => {
    console.log(file);
    if (type === 'profile picture') {
      createUserProfilePicture({
        variables: { userId: object?.id, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    } else if (type === 'league logo') {
      createLeagueLogo({
        variables: { leagueId: object?.id, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    } else if (type === 'battle thumbnail') {
      updateBattleThumbnail({
        variables: { battleId: object?.id, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    } else if (type === 'battler image') {
      updateBattlerImage({
        variables: { battlerId: object?.id, name: fileName, image: file },
        onCompleted: refetchContent,
      });
    } else if (type === 'award image') {
      createAward({
        variables: { name: fileNameNoExtension(), image: file },
        onCompleted: refetchContent,
      });
    }
  };

  // renames cat.jpg to cat. Note that a name like cat.picture.jpg will just return cat
  const fileNameNoExtension = () => {
    return fileName.split('.')[0];
  };

  const refetchContent = () => {
    onClose();
    refetch();
  };

  return (
    <BasicModal isOpen={isOpen} onClose={onClose}>
      <Dropzone onSubmit={onSubmit} />
      {/* <form onSubmit={onSubmit}>
        <div className='custom-file'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {fileName}
          </label>
        </div>

        <input type='submit' value='Upload' />
      </form> */}
    </BasicModal>
  );
}

export default ChangeFileForm;
