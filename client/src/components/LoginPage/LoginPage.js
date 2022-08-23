import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import { useSelector } from 'react-redux';

function LoginPage() {
  const navigate = useNavigate();

  // the current redux user
  const { user, error } = useSelector((state) => state.user.userState);

  // if the user is logged in through redux, navigates back to homepage
  useEffect(() => {
    if (user?.email) {
      navigate('/');
    }
  }, [user]);

  return (
    <>
      <LoginForm />
      {error ? <div>{error}</div> : null}
    </>
  );
}

export default LoginPage;
