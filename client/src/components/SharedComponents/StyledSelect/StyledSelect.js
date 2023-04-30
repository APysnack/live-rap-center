import React from 'react';
import Select from 'react-select';
import { useTheme } from 'styled-components';

function StyledSelect({ className, options, onChange, value }) {
  const theme = useTheme();

  const reactSelectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme.primaryContrast,
      color: theme.primary,
      width: '17vw',
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
  };

  return (
    <Select
      className={className}
      options={options}
      value={value}
      onChange={(input) => onChange(input)}
      styles={reactSelectStyles}
    />
  );
}

export default StyledSelect;