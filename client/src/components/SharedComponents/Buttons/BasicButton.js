import React from 'react';
import { BasicButtonStyle } from './Button.styles';

function BasicButton({
  children,
  padding = '0',
  width = '14em',
  onClick = () => {},
}) {
  return (
    <BasicButtonStyle
      onClick={onClick}
      style={{ padding: padding, width: width }}
    >
      {children}
    </BasicButtonStyle>
  );
}

export default BasicButton;
