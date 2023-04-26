import React from 'react';
import { ContentContainer, GridContainer } from './ContentContainer.styles';

function ContentStyleWrapper({
  children,
  width = 500,
  height = 400,
  justifyContent = 'center',
  alignItems = 'center',
  flexDirection = 'row',
  grid = false,
  margin = '0 0 0 0',
}) {
  return grid ? (
    <GridContainer>{children}</GridContainer>
  ) : (
    <ContentContainer
      style={{
        margin: margin,
        width: width,
        height: height,
        justifyContent: justifyContent,
        alignItems: alignItems,
        flexDirection: flexDirection,
        display: 'flex',
      }}
    >
      {children}
    </ContentContainer>
  );
}

export default ContentStyleWrapper;
