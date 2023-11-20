import React from 'react';
import Select from 'react-select';
import { useTheme } from 'styled-components';

function StyledSelect({ className, options, onChange, onSearch, value }) {
  const theme = useTheme();

  const reactSelectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme.primaryContrast,
      color: theme.primary,
      width: '100%',
      margin: '0.5em 0 0.5em 0',
      border: 0,
      boxShadow: 'none',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme.secondary,
      color: theme.fontColor,
    }),
    option: (baseStyles, { isFocused }) => ({
      ...baseStyles,
      backgroundColor: isFocused ? theme.primaryContrast : null,
      color: isFocused ? theme.primary : null,
    }),
    placeholder: (baseStyles) => ({
      ...baseStyles,
      color: theme.primary,
    }),
  };

  return (
    <Select
      className={className}
      options={options}
      value={value}
      onChange={(input) => onChange(input)}
      onInputChange={(input) => onSearch(input)}
      styles={reactSelectStyles}
    />
  );
}

export default StyledSelect;
