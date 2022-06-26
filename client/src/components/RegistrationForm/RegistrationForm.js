import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/userState";
import { useNavigate } from "react-router-dom";
import BaseForm from "../SharedComponents/BaseForm";
import {
  usernameField,
  passwordField,
  passwordConfirmationField,
  emailField,
} from "./RegistrationFormFields";

function RegistrationForm() {
  const dispatch = useDispatch();
  const { user, error } = useSelector((state) => state.user.userState);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);

  const callRegisterUser = (inputValues) => {
    let payload = {
      user: {
        username: inputValues.username,
        email: inputValues.email,
        password: inputValues.password,
      },
    };
    dispatch(registerUser(payload));
  };

  useEffect(() => {
    if (!Object.keys(initialValues).length > 0 && !fieldArray.length > 0) {
      let newValues = {};
      // sets keys for newValues
      newValues[usernameField.id] = usernameField.initialValue;
      newValues[emailField.id] = emailField.initialValue;
      newValues[passwordField.id] = passwordField.initialValue;
      newValues[passwordConfirmationField.id] =
        passwordConfirmationField.initialValue;

      // replaces initial values empty array with newValues
      setInitialValues({ ...initialValues, ...newValues });

      // pushes objects into the array
      setFieldArray((fieldArray) => [...fieldArray, usernameField]);
      setFieldArray((fieldArray) => [...fieldArray, emailField]);
      setFieldArray((fieldArray) => [...fieldArray, passwordField]);
      setFieldArray((fieldArray) => [...fieldArray, passwordConfirmationField]);
    }
  }, []);

  return (
    // still need to implement form validation
    <div>
      <BaseForm
        initialValues={initialValues}
        fieldArray={fieldArray}
        onSubmit={callRegisterUser}
        title={"Register User"}
      />
    </div>
  );
}

export default RegistrationForm;
