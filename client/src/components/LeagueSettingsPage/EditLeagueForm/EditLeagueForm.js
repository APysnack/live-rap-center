import React, { useState, useEffect } from 'react';
import BaseForm from '../../SharedComponents/BaseForm';
import { leagueNameField } from './EditLeagueFormFields';
import { UPDATE_LEAGUE_SETTINGS } from './gql';
import { useMutation } from '@apollo/client';
import SettingsGroup from '../../SharedComponents/SettingsGroup/SettingsGroup';

function EditLeagueForm({ refetch, league }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);
  const [updateLeagueSettings, { data }] = useMutation(UPDATE_LEAGUE_SETTINGS);

  const updateLeague = (values) => {
    if (values?.leagueName) {
      updateLeagueSettings({
        variables: { leagueId: league.id, leagueName: values.leagueName },
        onCompleted: refetch,
      });
    }
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[leagueNameField.id] = leagueNameField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, leagueNameField]);
    }
  }, []);

  const editLeagueForm = () => {
    return (
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={updateLeague}
        title={''}
      />
    );
  };

  const settingsProps = {
    header: 'Your League',
    components: [{ title: 'League Name', component: editLeagueForm }],
  };

  return (
    <SettingsGroup
      width={25}
      height={50}
      settingsProps={settingsProps}
    ></SettingsGroup>
  );
}

export default EditLeagueForm;
