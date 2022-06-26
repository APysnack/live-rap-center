// basic Formik form that can populate based on dynamic values passed in.
// See CreateLeague for a simple example of implementation without checkbox fields
// See BattlerSettingsFormFields with implementation including checkboxes that disable fields
// ** can support multiple checkbox fields

import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import { FormWrapper } from "./BaseForm.styles";
import CheckboxField from "./CheckboxField";

function BaseForm({
  title = "Form Title",
  submitText = "Submit",
  initialValues,
  fieldArray,
  onSubmit,
}) {
  const [checkboxStates, setCheckboxStates] = useState({});

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
    return "Loading...";

  return (
    <>
      <h1>{title}</h1>
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
          <FormWrapper>
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
                  <label className="mb-6 block text-gray-700 text-sm font-bold mb-2">
                    {field.displayedLabel}
                  </label>
                  <Field
                    className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id={field.id}
                    name={field.name}
                    placeholder={field.placeholder}
                    type={field.type}
                  />
                </div>
              )
            )}
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              {submitText}
            </button>
          </FormWrapper>
        </Form>
      </Formik>
    </>
  );
}

export default BaseForm;
