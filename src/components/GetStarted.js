import React, { useState } from "react";
import "./css/GetStarted.css";
import { Link } from "react-router-dom";

function GetStarted() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Create an object with the user's credentials
    const userCredentials = {
      email,
      password,
    };

    // Send a POST request to the Java backend using fetch
    fetch("http://localhost:8090/api/v1/user/login", {
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

        // You can redirect to another component after successful login if needed.
        // For example, using React Router:
        // history.push("/dashboard"); // Make sure to import useHistory from 'react-router-dom' and configure your routes
      })
      .catch((error) => {
        // Handle errors, e.g., show an error message
        console.error("Login failed:", error);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            {/* Your image */}
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 " style={{ marginTop: "80px" }}>
            <div className="form-outline mb-4">
              <input
                type="email"
                id="form3Example3"
                className="form-control form-control-lg"
                placeholder="Enter a valid email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="form-label" htmlFor="form3Example3">
                Email address
              </label>
            </div>

            <div className="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="form-label" htmlFor="form3Example4">
                Password
              </label>
            </div>

            <div className="d-flex justify-content-between align-items-center">
              <div className="form-check mb-0">
                <input
                  className="form-check-input me-2"
                  type="checkbox"
                  value=""
                  id="form2Example3"
                />
                <label className="form-check-label" htmlFor="form2Example3">
                  Remember me
                </label>
              </div>
              <a href="#!" className="text-body">
                Forgot password?
              </a>
            </div>

            <div className="text-center text-lg-start mt-4 pt-2">
              <button
                type="button"
                style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                onClick={handleLogin}
              >
                Login
              </button>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                Don't have an account?{" "}
                <a href="#!" className="link-danger">
                  <Link to="/Register">Register</Link>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
