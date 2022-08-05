import React, { useEffect, useState } from 'react';
import BaseForm from '../../../SharedComponents/BaseForm';

function UpdateAwardForm({ award, onSubmit }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      const awardNameField = {
        id: 'awardName',
        initialValue: award.name,
        name: 'awardName',
        placeholder: 'Enter award name',
        type: 'text',
        displayedLabel: 'Award Name',
      };

      const awardTypeField = {
        id: 'awardType',
        initialValue: award.awardType,
        name: 'awardType',
        placeholder: 'Enter award type',
        type: 'text',
        displayedLabel: 'Award Type',
      };

      let newValues = {};
      // sets keys for newValues
      newValues[awardNameField.id] = awardNameField.initialValue;
      newValues[awardTypeField.id] = awardTypeField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, awardNameField]);
      setFieldArray((fieldArray) => [...fieldArray, awardTypeField]);
    }
  }, []);

  return (
    <BaseForm
      initialValues={initialValues}
      fieldArray={fieldArray}
      onSubmit={onSubmit}
      title={''}
    />
  );
}

export default UpdateAwardForm;
