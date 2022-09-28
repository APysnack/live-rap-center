import React, { useState, useEffect } from 'react';
import { logoutUser } from '../../redux/userState';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserPage from '../UserPage/UserPage';

function Homepage({ cable }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // current redux state of the user
  const { user, isLoggedIn, isLoading } = useSelector(
    (state) => state.user.userState
  );

  // checks to see if user has an auth_token, if not redirects to login
  // if so, sets token payload to trigger login with token
  useEffect(() => {
    if (!user?.email) {
      navigate('/login');
    }
  }, [user]);

  // logs out the user and changes the token
  const callLogoutUser = () => {
    let payload = {
      email: user.email,
    };
    dispatch(logoutUser(payload));
    navigate('/login');
  };

  return (
    <>
      {isLoading && 'Loading...'}
      {user?.email && isLoggedIn ? (
        <UserPage callLogoutUser={callLogoutUser} cable={cable} />
      ) : (
        'User is not logged in'
      )}
    </>
  );
}

export default Homepage;
