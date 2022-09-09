import React from 'react';

import { Avatar } from '@mui/material';

const { REACT_APP_SERVER_URL } = process.env;

const IMAGE_WIDTH = 70;
const IMAGE_HEIGHT = 70;

function Thumbnail({
  type,
  object,
  width = IMAGE_WIDTH,
  height = IMAGE_HEIGHT,
}) {
  const YOUTUBE_IMAGE_URL = `https://i.ytimg.com/vi/${object.battleUrl}/hqdefault.jpg`;

  const getSourceFromType = () => {
    switch (type) {
      case 'battleImage':
        return object.thumbnail
          ? REACT_APP_SERVER_URL + object.thumbnail
          : YOUTUBE_IMAGE_URL;
      case 'battlerImage':
        return object?.user?.profilePictureUrl
          ? REACT_APP_SERVER_URL + object.user.profilePictureUrl
          : REACT_APP_SERVER_URL + object.image;
      case 'leagueLogo':
        return object.logoUrl ? REACT_APP_SERVER_URL + object.logoUrl : null;
      default:
        return REACT_APP_SERVER_URL + object.image;
    }
  };

  return (
    <Avatar
      src={getSourceFromType()}
      sx={{ width: width, height: height }}
      className='thumb-image'
    />
  );
}

export default Thumbnail;
