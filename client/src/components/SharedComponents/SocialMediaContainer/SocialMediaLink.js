import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Audiotrack,
  GraphicEq,
} from '@mui/icons-material';
import { useTheme } from 'styled-components';
import BasicButton from '../Buttons/BasicButton';

function SocialMediaLink({ type, url }) {
  const theme = useTheme();

  const iconStyle = { fontSize: 30, color: theme.primary };

  return (
    <a href={url}>
      <BasicButton padding='0.1em'>
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

        <div>{url.split('/')[3]}</div>
      </BasicButton>
    </a>
  );
}

export default SocialMediaLink;
