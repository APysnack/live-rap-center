import { useSearchParams } from "react-router-dom";
import api from "../../api/api";
import { Formik, Form, Field } from "formik";
import {
  FieldContainer,
  FormWrapper,
} from "../SharedComponents/BaseForm.styles";

function PasswordEdit() {
  let [searchParams, setSearchParams] = useSearchParams();
  let token = searchParams.get("token");

  const handleSubmit = (values) => {
    if (token && values.password) {
      let payload = { token: token, new_password: values.password };
      api.updatePassword(payload);
    }
  };

  return (
    <>
      <h1>Password Reset</h1>
      <Formik
        initialValues={{
          password: "",
          passwordConfirmation: "",
        }}
        validate={(values) => {
          const errors = {};
          // todo: validate password & password confirmation match
        }}
        onSubmit={(values, { setSubmitting, resetForm }) => {
          setTimeout(() => {
            setSubmitting(false);
            handleSubmit(values);
            resetForm();
          }, 500);
        }}
      >
        <Form>
          <FormWrapper>
            <FieldContainer>
              <label className="mb-6 block text-gray-700 text-sm font-bold mb-2">
                Password
              </label>
              <Field
                className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                placeholder="Please enter your new password"
                type="password"
              />
              <label className="mb-6 block text-gray-700 text-sm font-bold mb-2">
                Confirm Password
              </label>
              <Field
                className="mb-6 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="passwordConfirmation"
                name="passwordConfirmation"
                placeholder="Please confirm your password"
                type="password"
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

export default PasswordEdit;
