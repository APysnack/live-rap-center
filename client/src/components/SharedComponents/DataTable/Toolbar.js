import React from 'react';
import SearchBar from '../SearchBar/SearchBar';

function Toolbar({ onSearch }) {
  return (
    <div>
      <SearchBar onSearch={onSearch} />
    </div>
  );
}

export default Toolbar;
