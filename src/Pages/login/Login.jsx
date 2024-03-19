import React, { useState, useContext } from "react";
import { loginCall } from "../../context/authContext/AuthApiCalls";
import { AuthContext } from "../../context/authContext/AuthContext";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error, dispatch } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    loginCall({ email, password }, dispatch);
  };

  return (
    <div className="login">
      {isFetching ? (
        <div className="loggingIn">Signing in, Please wait...</div>
      ) : (
        <form className="loginForm">
          <img
            src="https://firebasestorage.googleapis.com/v0/b/dracc-53c18.appspot.com/o/img%2FlogoDark.png?alt=media&token=6c7ce575-ed2b-48dd-a171-bbaafa828bff"
            alt=""
            className="loginLogo"
          />
          {error && <h3 className="error">Wrong Username or Password</h3>}
          <h2 className="title">Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="loginInput"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="loginInput"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="loginButton"
            onClick={handleLogin}
            // disabled={isFetching}
          >
            Login
          </button>
        </form>
      )}
    </div>
  );
};

export default Login;
