import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userState';
import { passwordField, emailField } from './LoginFormFields';
import { GoogleLogin } from '@react-oauth/google';

function LoginForm() {
  const dispatch = useDispatch();
  const [initialValues, setInitialValues] = useState({});
  const [fieldArray, setFieldArray] = useState([]);

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

  const handleSuccess = (response) => {
    let payload = { token: response.credential };
    dispatch(loginUser(payload));
  };

  const handleError = (response) => {
    console.log('Fail');
    console.log(response);
  };

  return (
    // still need to implement form validation
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}

export default LoginForm;
