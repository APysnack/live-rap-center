import React from 'react';
import { ContentContainer } from './ContentContainer.styles';

function ContentStyleWrapper({
  children,
  width = 500,
  height = 400,
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'row',
}) {
  return (
    <ContentContainer
      style={{
        width: width,
        height: height,
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexDirection: flexDirection,
      }}
    >
      {children}
    </ContentContainer>
  );
}

export default ContentStyleWrapper;
