import React, { useState, useEffect } from 'react';
import { loginWithToken, logoutUser } from '../../redux/userState';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UserPage from '../UserPage/UserPage';

function Homepage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // if user has a token, tokenPayload is sent to loginWithToken function
  const [tokenPayload, setTokenPayload] = useState({});

  // current redux state of the user
  const { user, isLoggedIn, isLoading } = useSelector(
    (state) => state.user.userState
  );

  // // checks to see if user has an auth_token, if not redirects to login
  // // if so, sets token payload to trigger login with token
  // useEffect(() => {
  //   let authToken = localStorage.getItem("auth_token");
  //   if (authToken) {
  //     let tempTokenPayload = {
  //       headers: {
  //         authorization: authToken,
  //       },
  //     };
  //     setTokenPayload(tempTokenPayload);
  //   } else {
  //     navigate("/login");
  //   }
  // }, []);

  // // verifies the token and logs in the user
  // useEffect(() => {
  //   if (tokenPayload && Object.keys(tokenPayload).length > 0) {
  //     dispatch(loginWithToken(tokenPayload));
  //   }
  // }, [tokenPayload, dispatch]);

  // logs out the user and changes the token
  const callLogoutUser = () => {
    dispatch(logoutUser(tokenPayload));
    navigate('/login');
  };

  return (
    <>
      {isLoading && 'Loading...'}
      {user?.email && isLoggedIn ? (
        <UserPage callLogoutUser={callLogoutUser} />
      ) : (
        'User is not logged in'
      )}
    </>
  );
}

export default Homepage;
