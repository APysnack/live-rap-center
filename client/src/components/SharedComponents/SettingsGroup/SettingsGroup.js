import React from 'react';
import { SettingsContainer } from './SettingsGroup.styles';
import ContentContainer from '../ContentContainer/ContentStyleWrapper';

function SettingsGroup({
  children,
  width = 32,
  height = 50,
  alignItems = 'flex-start',
}) {
  return (
    <ContentContainer
      width={`${width + 2}vw`}
      height={`${height}vh`}
      alignItems={alignItems}
    >
      <SettingsContainer>{children}</SettingsContainer>
    </ContentContainer>
  );
}

export default SettingsGroup;
