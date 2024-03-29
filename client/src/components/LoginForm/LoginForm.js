import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../redux/userState';
import { GoogleLogin } from '@react-oauth/google';

function LoginForm() {
  const dispatch = useDispatch();
  const [loginErrorMessage, setLoginErrorMessage] = useState('');

  const handleSuccess = (response) => {
    // returns google id token
    let payload = { token: response.credential };
    dispatch(loginUser(payload));
    setLoginErrorMessage('');
  };

  const handleError = (response) => {
    setLoginErrorMessage(
      'The gmail information you provided appears to be incorrect'
    );
  };

  return (
    // still need to implement form validation
    <>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        width={200}
      />
      {loginErrorMessage !== '' ? <div>{loginErrorMessage}</div> : null}
    </>
  );
}

export default LoginForm;
