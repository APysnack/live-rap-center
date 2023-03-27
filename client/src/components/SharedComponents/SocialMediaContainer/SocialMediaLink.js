import React, { useEffect } from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Audiotrack,
  GraphicEq,
} from '@mui/icons-material';
import { useTheme } from 'styled-components';
import { LinkContainer } from './SocialMediaContainer.styles';

function SocialMediaLink({ type, url }) {
  const theme = useTheme();

  const iconStyle = { fontSize: 30, color: theme.primary };

  return (
    <LinkContainer>
      <a href={url}>
        {(() => {
          switch (type) {
            case 'Facebook':
              return <Facebook sx={iconStyle} />;
            case 'Instagram':
              return <Instagram sx={iconStyle} />;
            case 'Twitter':
              return <Twitter sx={iconStyle} />;
            case 'Tiktok':
              return <Audiotrack sx={iconStyle} />;
            case 'SoundCloud':
              return <GraphicEq sx={iconStyle} />;
            default:
              return null;
          }
        })()}
      </a>
      <div>{url.split('/')[3]}</div>
    </LinkContainer>
  );
}

export default SocialMediaLink;
