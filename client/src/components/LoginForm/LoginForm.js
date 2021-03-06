import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/userState";
import BaseForm from "../SharedComponents/BaseForm";
import { passwordField, emailField } from "./LoginFormFields";

function LoginForm() {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  const callLoginUser = (inputValues) => {
    let payload = {
      user: {
        email: inputValues.email,
        password: inputValues.password,
      },
    };
    dispatch(loginUser(payload));
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[emailField.id] = emailField.initialValue;
      newValues[passwordField.id] = passwordField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, emailField]);
      setFieldArray((fieldArray) => [...fieldArray, passwordField]);
    }
  }, []);

  return (
    // still need to implement form validation
    <div>
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={callLoginUser}
        title={"Login"}
      />
    </div>
  );
}

export default LoginForm;
