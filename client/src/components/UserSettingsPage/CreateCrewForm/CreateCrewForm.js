import React, { useEffect, useState } from 'react';
import BaseForm from '../../SharedComponents/BaseForm';
import { crewNameField } from './CreateCrewFormFields';
import { useMutation } from '@apollo/client';
import { CREATE_CREW } from './gql';

function CreateCrewForm({ user }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const [createCrew, { data, loading, error }] = useMutation(CREATE_CREW);

  const addNewCrew = (values) => {
    createCrew({
      variables: { crewName: values.crewName, userId: user.id },
    });
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[crewNameField.id] = crewNameField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, crewNameField]);
    }
  }, []);

  if (loading) return 'Loading...';
  if (error) return `Submission error ${error.message}`;

  return (
    <div>
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={addNewCrew}
        title={''}
      />
    </div>
  );
}

export default CreateCrewForm;
