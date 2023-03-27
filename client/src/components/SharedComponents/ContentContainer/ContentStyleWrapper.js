import React from 'react';
import { ContentContainer } from './ContentContainer.styles';

function ContentStyleWrapper({ children, width = 500, height = 350 }) {
  return (
    <ContentContainer style={{ width: width, height: height }}>
      {children}
    </ContentContainer>
  );
}

export default ContentStyleWrapper;
