import React from 'react';

function FlexContainer({
  children,
  type = 'row',
  gap = '0.2em',
  margin = '1em',
}) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: type,
        gap: gap,
        margin: margin,
      }}
    >
      {children}
    </div>
  );
}

export default FlexContainer;
