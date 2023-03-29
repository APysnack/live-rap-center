import React, { useState } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { UPDATE_SELECTED_THEME } from './gql';
import { useMutation } from '@apollo/client';

// first theme will be default in the select box
const THEMES = [
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'frieza', label: 'Frieza' },
  { value: 'darkTheme', label: 'Dark Theme' },
];

function ThemeSelector({ user, refetchUser }) {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [updateSelectedTheme] = useMutation(UPDATE_SELECTED_THEME);

  const updateUserTheme = (theme) => {
    updateSelectedTheme({
      variables: {
        userId: user.id,
        themeName: theme,
      },
      onCompleted: refetchUser,
    });
  };

  React.useEffect(() => {
    if (user?.selectedTheme) {
      const selectedThemeIndex = _.findIndex(THEMES, (theme) => {
        return user.selectedTheme === theme.value;
      });
      setSelectedTheme(THEMES[selectedThemeIndex]);
    }
  }, [user]);

  return (
    <div>
      <Select
        options={THEMES}
        value={selectedTheme}
        onChange={(selection) => updateUserTheme(selection.value)}
      />
    </div>
  );
}

export default ThemeSelector;
