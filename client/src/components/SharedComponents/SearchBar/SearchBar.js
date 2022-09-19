import React, { useCallback } from 'react';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 600;

function SearchBar({ onSearch }) {
  const handleChange = (text) => {
    onSearch(text);
  };

  const debouncedSearch = useCallback(
    debounce(handleChange, DEBOUNCE_DELAY),
    []
  );
  return (
    <div>
      <input
        className='search-bar'
        type='text'
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder='Search'
      ></input>
    </div>
  );
}

export default SearchBar;
