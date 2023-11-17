import React from "react";
import "./css/DoctorLogin.css"; // Import your CSS file for styling
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

const DoctorLogin = () => {
  console.log("hello there , im in doctor  login");

  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const [userNameError, setUserNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const validateForm = () => {
    let valid = true;

    if (!username) {
      setUserNameError("username is required");
      valid = false;
    } else if (!isValidUsername(username)) {
      setUserNameError("Invalid email format");
      valid = false;
    } else {
      setUserNameError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };
  const isValidUsername = (username) => {
    // Regular expression for a simple email format validation
    const usernameRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return usernameRegex.test(username);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Do something with the entered username and password

    if (validateForm()) {
      // The form is valid, you can proceed with login logic here.
      console.log("Login button clicked");
      console.log("Username:", username);
      console.log("Password:", password);
      // history.push("/UserDashboard");
      navigate("/DoctorDashboard");
      // Send the POST request to your backend.
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="text-danger">{userNameError}</div>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="text-danger">{passwordError}</div>
          <button type="submit">Login</button>
        </form>
      </div>
      <div className="login-image">
        <img
          src="https://as1.ftcdn.net/v2/jpg/02/58/30/24/1000_F_258302473_TN25oZ5Dt9MYHPEr5vAD62cUgRBSwNAG.jpg" // Replace with your image URL
          alt="Login Image"
          style={{ width: "500px", height: "400px" }}
        />
      </div>
    </div>
  );
};

export default DoctorLogin;
