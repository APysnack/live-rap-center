import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import useViewType from '../../../utils/useViewType';

function Toolbar({ onSearch }) {
  const viewType = useViewType();

  return (
    <div style={viewType === 'mobile' ? { width: '100%' } : null}>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default Toolbar;
