import React, { useState } from 'react';
import Select from 'react-select';
import _ from 'lodash';
import { UPDATE_SELECTED_THEME } from './gql';
import { useMutation } from '@apollo/client';
import SettingsGroup from '../../SharedComponents/SettingsGroup/SettingsGroup';
import LocationSelector from '../../SharedComponents/LocationSelector/LocationSelector';
import { useTheme } from 'styled-components';

// first theme will be default in the select box
const THEMES = [
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'frieza', label: 'Frieza' },
  { value: 'darkTheme', label: 'Dark Theme' },
];

function UserSettings({ user, refetchUser }) {
  const [selectedTheme, setSelectedTheme] = useState(THEMES[0]);
  const [updateSelectedTheme] = useMutation(UPDATE_SELECTED_THEME);
  const theme = useTheme();

  const reactSelectStyles = {
    control: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme.primaryContrast,
      color: theme.primary,
      width: '17vw',
    }),
    menu: (baseStyles) => ({
      ...baseStyles,
      backgroundColor: theme.secondary,
      color: theme.fontColor,
    }),
  };

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
    <SettingsGroup width={25} height={40}>
      <div className='header'>User Settings</div>

      <div className='settings-content'>
        <div className='form-container'>
          <div className='subheading'>Select a Theme</div>
          <Select
            styles={reactSelectStyles}
            className='react-select-container'
            options={THEMES}
            value={selectedTheme}
            onChange={(selection) => updateUserTheme(selection.value)}
          />
        </div>

        <div className='form-container'>
          <div className='subheading'>Select your location</div>
          <LocationSelector object={user} refetch={refetchUser} type='user' />
        </div>
      </div>
    </SettingsGroup>
  );
}

export default UserSettings;
