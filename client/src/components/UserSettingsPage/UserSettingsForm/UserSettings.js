import React, { useState, useEffect } from 'react';
import StyledSelect from '../../SharedComponents/StyledSelect/StyledSelect';
import _ from 'lodash';
import { UPDATE_SELECTED_THEME } from './gql';
import { useMutation } from '@apollo/client';
import SettingsGroup from '../../SharedComponents/SettingsGroup/SettingsGroup';
import LocationSelector from '../../SharedComponents/LocationSelector/LocationSelector';

// first theme will be default in the select box
const THEMES = [
  { value: 'philadelphia', label: 'Philadelphia' },
  { value: 'frieza', label: 'Frieza' },
  { value: 'darkTheme', label: 'Dark Theme' },
];

function UserSettings({ user, refetchUser }) {
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

  useEffect(() => {
    if (user?.selectedTheme) {
      const selectedThemeIndex = _.findIndex(THEMES, (theme) => {
        return user.selectedTheme === theme.value;
      });
      setSelectedTheme(THEMES[selectedThemeIndex]);
    }
  }, [user]);

  const themeSelector = () => {
    return (
      <div className='form-width-control'>
        <StyledSelect
          className='react-select-container'
          options={THEMES}
          value={selectedTheme}
          onChange={(selection) => updateUserTheme(selection.value)}
        />
      </div>
    );
  };

  const locationSelector = () => {
    return <LocationSelector object={user} refetch={refetchUser} type='user' />;
  };

  const settingsProps = {
    header: 'User Settings',
    components: [
      { title: 'Select a Theme', component: themeSelector },
      { title: 'Select your location', component: locationSelector },
    ],
  };

  return (
    <SettingsGroup
      width={25}
      height={40}
      settingsProps={settingsProps}
    ></SettingsGroup>
  );
}

export default UserSettings;
