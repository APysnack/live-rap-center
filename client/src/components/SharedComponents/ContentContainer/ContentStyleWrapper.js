import React from 'react';
import { ContentContainer } from './ContentContainer.styles';

function ContentStyleWrapper({
  children,
  width = 500,
  height = 400,
  justifyContent = 'center',
  alignItems = 'center',
}) {
  return (
    <ContentContainer
      style={{
        width: width,
        height: height,
        justifyContent: justifyContent,
        alignItems: alignItems,
      }}
    >
      {children}
    </ContentContainer>
  );
}

export default ContentStyleWrapper;
