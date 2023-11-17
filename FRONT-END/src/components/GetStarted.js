import { useState } from "react";
import React from "react";
import "./css/GetStarted.css";
import { Link, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

function GetStarted() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // const history = useHistory();
  const navigate = useNavigate();

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError("Email is required");
      valid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Invalid email format");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };
  const isValidEmail = (email) => {
    // Regular expression for a simple email format validation
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  const handleLogin = () => {
    if (validateForm()) {
      // The form is valid, you can proceed with login logic here.
      console.log("Login button clicked");
      // history.push("/UserDashboard");
      navigate("/UserDashboard");
      // Send the POST request to your backend.
    }
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img
              src="https://www.hayeslocums.com/wp-content/uploads/2023/03/Hayes-Locums-NationalDoctorsDay-1024x498.jpg.webp"
              className="img-fluid"
              alt="Sample image"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div
            className="col-md-8 col-lg-6 col-xl-4 offset-xl-1"
            style={{ marginTop: "80px" }}>
            <form>
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
                <div className="text-danger">{emailError}</div>
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
                <div className="text-danger">{passwordError}</div>
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
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default GetStarted;
