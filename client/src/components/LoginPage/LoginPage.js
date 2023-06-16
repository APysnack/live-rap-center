import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../LoginForm/LoginForm';
import { useSelector } from 'react-redux';
import { LoginPageContainer } from './LoginPage.styles';

const logoUrl = 'https://lrc-public-files.s3.amazonaws.com/lrc-logo-red.png';

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
    <LoginPageContainer>
      <LoginForm />

      <img src={logoUrl} className='logo'></img>
      <div className='subtext'>LIVE RAP CENTER</div>

      {error ? <div>{error}</div> : null}
    </LoginPageContainer>
  );
}

export default LoginPage;
