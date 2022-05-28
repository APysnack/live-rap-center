import React from "react";
import { Formik, Form, Field } from "formik";
import {
  FieldContainer,
  FormWrapper,
} from "../SharedComponents/BaseForm.styles";
import api from "../../api/api";

function PasswordReset() {
  const callPasswordReset = (inputValues) => {
    let payload = {
      user: {
        email: inputValues.email,
      },
    };
    api.passwordReset(payload);
  };

  return (
    <>
      <h1>Password Reset</h1>
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          }
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            callPasswordReset(values);
            resetForm();
          }, 500);
        }}
      >
        <Form>
          <FormWrapper>
            <FieldContainer>
              <label className="mb-6 block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <Field
                className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                placeholder="Please enter your email"
                type="email"
              />
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Submit
              </button>
            </FieldContainer>
          </FormWrapper>
        </Form>
      </Formik>
    </>
  );
}

export default PasswordReset;
