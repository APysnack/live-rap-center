import React from 'react';
import { ContentContainer } from './ContentContainer.styles';

function ContentStyleWrapper({ children }) {
  return <ContentContainer>{children}</ContentContainer>;
}

export default ContentStyleWrapper;
