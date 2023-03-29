// Checkbox field designed to disable a formik field when checked

import React, { useState, useEffect } from 'react';
import { Checkbox } from '@mui/material';
import { Field } from 'formik';

function CheckboxField({
  initialState,
  placeholder,
  id,
  name,
  body,
  label,
  setCheckboxStates,
  checkboxStates,
}) {
  const [isChecked, setIsChecked] = useState(initialState);

  useEffect(() => {
    setCheckboxStates({
      ...checkboxStates,
      [`${name}Checkbox`]: isChecked,
    });
  }, [isChecked]);

  return (
    <div>
      {!isChecked ? (
        <Field
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id={id}
          name={name}
          placeholder={placeholder}
          type={'text'}
          disabled={!isChecked}
          value={body}
        />
      ) : (
        <Field
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id={id}
          name={name}
          placeholder={placeholder}
          type={'text'}
        />
      )}

      <Checkbox
        checked={isChecked}
        onChange={() => setIsChecked(!isChecked)}
        label={label}
      />
      {label}
    </div>
  );
}

export default CheckboxField;
