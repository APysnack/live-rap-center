import React, { useState, useEffect } from "react";
import { loginWithToken, logoutUser } from "../../redux/userState";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserPage from "../UserPage/UserPage";

function Homepage() {
  const [tokenPayload, setTokenPayload] = useState({});
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user.userState);
  const [currentUser, setCurrentUser] = useState({
    isLoading: true,
    isLoggedIn: false,
    email: "",
    id: "",
  });
  const navigate = useNavigate();

  const callLogoutUser = () => {
    dispatch(logoutUser(tokenPayload));
    navigate("/login");
  };

  useEffect(() => {
    if (user?.email && !currentUser.isLoggedIn) {
      let newUserState = {
        isLoading: false,
        id: user.id,
        email: user.email,
        isLoggedIn: true,
      };
      setCurrentUser({ ...currentUser, ...newUserState });
    } else if (!user?.email && currentUser.isLoggedIn) {
      let newUserState = { email: null, isLoggedIn: false };
      setCurrentUser({ ...currentUser, ...newUserState });
    }
  }, [user]);

  useEffect(() => {
    let authToken = localStorage.getItem("auth_token");
    if (authToken) {
      let tempTokenPayload = {
        headers: {
          authorization: authToken,
        },
      };
      setTokenPayload(tempTokenPayload);
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const callLoginWithToken = () => {
      dispatch(loginWithToken(tokenPayload));
    };

    if (tokenPayload && Object.keys(tokenPayload).length > 0) {
      callLoginWithToken();
    }
  }, [tokenPayload, dispatch]);

  return (
    <>
      {currentUser.isLoading && "Loading..."}
      {currentUser.isLoggedIn ? (
        <UserPage userId={currentUser.id} callLogoutUser={callLogoutUser} />
      ) : (
        "User is not logged in"
      )}
    </>
  );
}

export default Homepage;
