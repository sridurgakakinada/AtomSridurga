import React, { useState } from "react";
import "./css/GetStarted.css";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

function GetStarted() {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("patient");
  const [userError, setUserError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const validateUsername = (username) => {
    // console.log("in the validation methjod of User name");
    return username;
  };
  const navigate = useNavigate();

  const handleLogin = () => {
    if (!validateUsername(userName)) {
      setUserError("");
      setUserError("Please eprovide the correct user name");
      return;
    }
    if (userName && password) {
      setIsLoggedIn(true);
    }
    // Create an object with the user's credentials
    const userCredentials = {
      // email,
      userName,
      password,
      userType,
    };

    const authenticateUser = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/Services/Health/AuthenticateUser",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(userCredentials),
          }
        );
        console.log("the user credentials are: ", userCredentials);

        if (!response.ok) {
          throw new Error("Login failed");
        }

        const data = await response.json();

        if (data.message === "Authentication Successful" && data.authCheck === true) {
          setIsLoggedIn(true);
          console.log("the login is successfull")
          navigate("/UserDashboard", { state: { userName } }); // Passing userName to UserDashboard
        } else {
          setIsLoggedIn(false);
        }

        // Clear form fields or perform other actions after processing the response
        setUsername("");
        setPassword("");
      } catch (error) {
        // Handle errors, e.g., display an error message
        alert("INVALID CREDENTAILS");
      }
    };
    authenticateUser();

    
  };

  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
        <h1></h1>
          <div className="col-md-9 col-lg-6 col-xl-5">
            {/* Your image */}
            <img
              src="https://www.hayeslocums.com/wp-content/uploads/2023/03/Hayes-Locums-NationalDoctorsDay-1024x498.jpg.webp"
              class="img-fluid"
              alt="Sample image"
              style={{ height: "100%", width: "100%" }}
            />
          </div>
          <div
            className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 "
            style={{ marginTop: "80px" }}>
            <div className="form-outline mb-4">
              <input
                type="text"
                id="form3Example3"
                className={`form-control form-control-lg ${
                  userError ? "is-invalid" : ""
                }`}
                placeholder="Enter a valid user name"
                value={userName}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <label className="form-label" htmlFor="form3Example3">
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
