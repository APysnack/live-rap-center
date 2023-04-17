import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Audiotrack,
  GraphicEq,
} from '@mui/icons-material';
import { useTheme } from 'styled-components';

const buttonStyle = {
  padding: '0.25em 3em 0.25em 3em',
  width: '12em',
  gap: '2em',
};

function SocialMediaLink({ type, url, iconOnly }) {
  const theme = useTheme();

  const iconStyle = {
    fontSize: iconOnly ? 40 : 30,
    color: iconOnly ? theme.primaryContrast : theme.primary,
  };

  const iconStyleWithHover = {
    ...iconStyle,
    '&:hover': {
      color: theme.tertiary,
    },
  };

  return (
    <a href={url}>
      <div
        className={iconOnly ? '' : 'lrc-button'}
        style={iconOnly ? null : buttonStyle}
      >
        {(() => {
          switch (type) {
            case 'Facebook':
              return <Facebook sx={iconStyleWithHover} />;
            case 'Instagram':
              return <Instagram sx={iconStyleWithHover} />;
            case 'Twitter':
              return <Twitter sx={iconStyleWithHover} />;
            case 'Tiktok':
              return <Audiotrack sx={iconStyleWithHover} />;
            case 'SoundCloud':
              return <GraphicEq sx={iconStyleWithHover} />;
            default:
              return null;
          }
        })()}
        {iconOnly ? null : <div>{url.split('/')[3]}</div>}
      </div>
    </a>
  );
}

export default SocialMediaLink;
