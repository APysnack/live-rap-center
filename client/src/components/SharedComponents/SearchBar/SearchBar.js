import React, { useCallback } from 'react';
import debounce from 'lodash.debounce';
import { SearchBarInput } from './SearchBar.styles';

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
      <SearchBarInput
        className='search-bar'
        type='text'
        onChange={(e) => debouncedSearch(e.target.value)}
        placeholder='Search'
      ></SearchBarInput>
    </div>
  );
}

export default SearchBar;
