import React, { useState, useEffect } from 'react';
import { commentField } from './CreateVoteFormFields';
import BaseForm from '../../../SharedComponents/BaseForm';

function CreateVoteForm({ onSubmit }) {
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[commentField.id] = commentField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, commentField]);
    }
  }, []);

  return (
    <div className='form-width-control'>
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={onSubmit}
        title={''}
      />
    </div>
  );
}

export default CreateVoteForm;
