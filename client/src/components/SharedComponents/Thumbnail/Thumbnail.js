import React from 'react';

import { Avatar } from '@mui/material';

const { REACT_APP_SERVER_URL } = process.env;

const IMAGE_WIDTH = 80;
const IMAGE_HEIGHT = 80;

function Thumbnail({
  type,
  object,
  width = IMAGE_WIDTH,
  height = IMAGE_HEIGHT,
  style = 'icon',
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

  const getStyleFromType = () => {
    switch (type) {
      case 'icon':
        return { width: '100%', height: height };
      case 'battleImage':
        return { width: '100%', height: 100 };
      default:
        return { width: '100%', height: height };
    }
  };

  const getVariantFromType = () => {
    switch (type) {
      case 'icon':
        return 'dot';
      case 'battleImage':
        return 'square';
      default:
        return 'square';
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Avatar
        src={getSourceFromType()}
        sx={getStyleFromType()}
        className='thumb-image'
        variant={getVariantFromType()}
      />
    </div>
  );
}

export default Thumbnail;
