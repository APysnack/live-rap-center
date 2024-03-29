import React from 'react';

import { Avatar } from '@mui/material';

const IMAGE_WIDTH = 80;
const IMAGE_HEIGHT = 80;

function Thumbnail({
  type,
  object,
  width = IMAGE_WIDTH,
  height = IMAGE_HEIGHT,
  fillParentContainer = true,
}) {
  const YOUTUBE_IMAGE_URL = `https://i.ytimg.com/vi/${object.battleUrl}/hqdefault.jpg`;

  const getSourceFromType = () => {
    switch (type) {
      case 'battleImage':
        return object.thumbnail ? YOUTUBE_IMAGE_URL : YOUTUBE_IMAGE_URL;
      case 'battlerImage':
        return object?.user?.profilePictureUrl
          ? object.user.profilePictureUrl
          : object.image;
      case 'leagueLogo':
        return object.logoUrl ? object.logoUrl : null;
      default:
        return object.image;
    }
  };

  const getStyleFromType = () => {
    switch (type) {
      case 'icon':
        return { width: '100%', height: height };
      case 'leagueLogo':
      case 'battleImage':
      case 'battlerImage':
        return fillParentContainer
          ? {
              width: '100%',
              height: '100%',
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundPosition:
                type === 'battleImage' ? 'top center' : undefined,
            }
          : { width: width, height: height };

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
      {type === 'battleImage' ? (
        <Avatar
          sx={getStyleFromType()}
          className='thumb-image'
          variant={getVariantFromType()}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${getSourceFromType()})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 33%',
              backgroundRepeat: 'no-repeat',
              position: 'absolute',
            }}
          />
        </Avatar>
      ) : (
        <Avatar
          src={getSourceFromType()}
          sx={getStyleFromType()}
          className='thumb-image'
          variant={getVariantFromType()}
        />
      )}
    </div>
  );
}

export default Thumbnail;
