import React, { useState } from "react";
import "./css/GetStarted.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

function GetStarted() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");

  const validateUsername = (username) => {
    console.log("in the validation methjod of User name");
    // const user=username;
    return username;
  };
  const navigate = useNavigate();

  const handleLogin = () => {
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
          console.log("teh response is ok, the login was succesfull");
          navigate("/UserDashboard", { state: { username } });
          console.log("the response is: ", response);

          return response.json(); // Parse the response as JSON
        } else {
          throw new Error("Login failed");
        }
      })
      .then((data) => {
        // Handle the successful response, e.g., store user data or token
        console.log("Login was successfull, maibu here", data);
        if (data.message == null) {
          console.log("the message was null");
        }

        // navigate("/UserDashboard");
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
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">{/* Your image */}</div>
          <div
            className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 "
            style={{ marginTop: "80px" }}>
            <div className="form-outline mb-4">
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
              <label className="form-label" htmlFor="form3Example3">
                {/* Email address */}
                USER NAME
              </label>

              {setUserError && (
                <div className="invalid-feedback">{userError}</div>
              )}
            </div>
            <div className="form-outline mb-3">
              <input
                type="password"
                id="form3Example4"
                className="form-control form-control-lg"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
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
                onClick={handleLogin}>
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
