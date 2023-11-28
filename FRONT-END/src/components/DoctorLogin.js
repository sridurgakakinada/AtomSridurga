import React, { useState } from "react";
import "./css/DoctorLogin.css";
// Import your CSS file for styling
// import { Link } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";

const DoctorLogin = () => {
  // const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [emailError, setEmailError] = useState("");
  const [userError, setUserError] = useState("");

  // const validateEmail = (email) => {
  //   console.log("in this validate email function");
  //   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //   return regex.test(email);
  // };
  const validateUsername = (username) => {
    console.log("in the validation methjod of User name");
    // const user=username;
    return username;
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    // setEmailError("");

    // // if (!validateEmail(email)) {
    //   setEmailError("Please enter a valid email address.");

    //   return;
    // }
    if (!validateUsername(username)) {
      setUserError("");
      setUserError("Pleas eprovide the correct user name");
      return;
    }

    // Create an object with the user's credentials
    const userCredentials = {
      // email,
      username,
      password,
    };

    // Send a POST request to the Java backend using fetch
    fetch("http://localhost:8080/Services/Health/AuthenticateUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((response) => {
        if (response.ok) {
          return response.json(); // Parse the response as JSON
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        // Handle the successful response, e.g., store user data or token
        console.log("Login was successful", data);
        navigate("/DoctorDashboard");

        // You can redirect to another component after successful login if needed.
        // For example, using React Router:
        // history.push("/dashboard"); // Make sure to import useHistory from 'react-router-dom' and configure your routes
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Login failed:", error);
      });

    // setEmail("");
    setUsername("");
    setPassword("");
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form>
          <div className="form-group">
            <input
              // type="email"
              type="text"
              id="form3Example3"
              className={`form-control form-control-lg ${
                // emailError ? "is-invalid" : ""
                userError ? "is-invalid" : ""
              }`}
              placeholder="Enter a valid user name"
              // value={email}
              value={username}
              // onChange={(e) => setEmail(e.target.value)}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="username">Username</label>
            {setUserError && (
              <div className="invalid-feedback">{userError}</div>
            )}
          </div>
          <div className="form-group">
            <input
              type="password"
              id="form3Example4"
              className="form-control form-control-lg"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
            {/* <input type="password" id="password" name="password" /> */}
          </div>
          <button
            type="button"
            style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
            onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
      <div className="login-image">
        <img
          src="https://as1.ftcdn.net/v2/jpg/02/58/30/24/1000_F_258302473_TN25oZ5Dt9MYHPEr5vAD62cUgRBSwNAG.jpg"
          alt="Login Image"
          // style={{ width: "500px", height: "200px", borderRadius: "10px" }}
        />
      </div>
    </div>
  );
};

export default DoctorLogin;
