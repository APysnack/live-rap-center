// basic Formik form that can populate based on dynamic values passed in.
// See CreateLeague for a simple example of implementation without checkbox fields
// See BattlerSettingsFormFields with implementation including checkboxes that disable fields
// ** can support multiple checkbox fields

import React, { useEffect, useState } from 'react';
import { Formik, Form, Field } from 'formik';
import { FormWrapper } from './BaseForm.styles';
import CheckboxField from './CheckboxField';
import useViewType from '../../utils/useViewType';
import Loading from './Loading/Loading';

function BaseForm({
  title = 'Form Title',
  submitText = 'Submit',
  initialValues,
  fieldArray,
  onSubmit,
  width = '15vw',
}) {
  const [checkboxStates, setCheckboxStates] = useState({});
  const viewType = useViewType();

  useEffect(() => {
    let checkBoxFields = {};
    fieldArray.map((field) => {
      if (field.isCheckboxField) {
        let newObj = {
          [`${field.name}Checkbox`]: field.isCheckboxField.initialState,
        };
        checkBoxFields = { ...checkBoxFields, ...newObj };
      }

      setCheckboxStates({ ...checkBoxFields });
    });
  }, [fieldArray]);

  if (!Object.keys(initialValues).length > 0 || !fieldArray.length > 0)
    return <Loading />;

  return (
    <>
      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          values = { ...values, ...checkboxStates };
          setTimeout(() => {
            setSubmitting(false);
            onSubmit(values);
            resetForm();
          }, 500);
        }}
      >
        <Form>
          <FormWrapper
            style={{ width: useViewType === 'desktop' ? width : '100%' }}
          >
            <div>{title}</div>
            {fieldArray.map((field) =>
              field.isCheckboxField ? (
                <CheckboxField
                  key={field.id}
                  initialState={field.isCheckboxField.initialState}
                  placeholder={field.placeholder}
                  id={field.id}
                  name={field.name}
                  label={field.isCheckboxField.disabledTextLabel}
                  body={field.isCheckboxField.disabledFieldText}
                  checkboxStates={checkboxStates}
                  setCheckboxStates={setCheckboxStates}
                />
              ) : (
                <div key={field.id}>
                  <label className='m-2 block text-sm font-bold mb-2'>
                    {field.displayedLabel}
                  </label>
                  <Field
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                </div>
              )
            )}

            <button className='lrc-button form-submit-btn' type='submit'>
              {submitText}
            </button>
          </FormWrapper>
        </Form>
      </Formik>
    </>
  );
}

export default BaseForm;
