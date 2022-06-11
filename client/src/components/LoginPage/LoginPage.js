import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import LoginForm from "../LoginForm/LoginForm";
import { useSelector } from "react-redux";

function LoginPage() {
  const navigate = useNavigate();

  // the current redux user
  const { user, error } = useSelector((state) => state.user.userState);

  // toggles the display of the registration form
  const [registrationEnabled, setRegistrationEnabled] = useState(false);

  const handleShowRegistration = () => {
    setRegistrationEnabled(true);
  };

  // if the user is logged in through redux, navigates back to homepage
  useEffect(() => {
    if (user?.email) {
      navigate("/");
    }
  }, [user]);

  return (
    <>
      {registrationEnabled ? <RegistrationForm /> : <LoginForm />}
      {error ? <div>{error}</div> : null}
      <h1>
        Don't have an account?{" "}
        <button onClick={handleShowRegistration} style={{ color: "blue" }}>
          Register
        </button>
      </h1>
      <Link style={{ color: "blue" }} to="/password-reset">
        Click here if you forgot your password
      </Link>
    </>
  );
}

export default LoginPage;
