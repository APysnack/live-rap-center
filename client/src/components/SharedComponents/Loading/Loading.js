import React from 'react';
import { ScaleLoader } from 'react-spinners';
import { useTheme } from 'styled-components';

function Loading() {
  const theme = useTheme();

  return (
    <div
      style={{
        width: '100%',
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ScaleLoader color={theme?.tertiary ? theme.tertiary : '#39FF14'} />
    </div>
  );
}

export default Loading;
