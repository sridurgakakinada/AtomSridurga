import React, { useState } from "react";
import "./css/DoctorLogin.css";

import { useNavigate} from "react-router-dom";
import DoctorDashboard from "./DoctorDashboard";
import { useEffect } from "react";

const DoctorLogin = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState("doctor");
  const [doctorList, setDoctorList] = useState([]);
  const [key1, setKey1] = useState(null);
 
  const validateUsername = (userName) => {
    console.log("in the validation methjod of User name");
    return userName;

  };
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchDoctorList = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://localhost:8080/Services/Health/getDoctorList"
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch");
  //       }

  //       const data = await response.json();
  //       setDoctorList(data); 
       
  //     } catch (error) {
  //       console.error("Error fetching doctor list:", error);
  //     }
  //   };


  //   fetchDoctorList();
  // }, []); 
  const handleLogin = async () => {
    if (!validateUsername(userName)) {
      setUserError("Please provide the correct username");
      return;
    }
  
    if (userName && password) {
      try {
        const response = await fetch(
          "http://localhost:8080/Services/Health/getDoctorList"
        );
  
        if (!response.ok) {
          throw new Error("Failed to fetch doctor list");
        }
  
        const data = await response.json();
        setDoctorList(data);
  
        const foundDoctor = data.find((doctor) => doctor.doctorName === userName);
  
        if (foundDoctor) {
          const index = data.indexOf(foundDoctor) + 1;
          setKey1(index);
          console.log(index);
  
          const userCredentials = {
            userName,
            password,
            userType,
            id: index // Use the updated index value directly
          };
          console.log(userCredentials);
  
          const authResponse = await fetch(
            "http://localhost:8080/Services/Health/AuthenticateUser",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(userCredentials)
            }
          );
  
          if (authResponse.ok) {
            const responseData = await authResponse.json();
            if (
              responseData.message === "Authentication Successful" &&
              responseData.authCheck === true
            ) {
              setIsLoggedIn(true);
              navigate("/DoctorDashboard", { state: { userName } });
            } else {
              setIsLoggedIn(false);
              // Handle authentication failure
            }
          } else {
            throw new Error("Authentication failed");
          }
  
          setUsername("");
          setPassword("");
        } else {
          // Handle case when the username is not found
          console.log("Doctor username not found");
        }
      } catch (error) {
        console.error("Error during login:", error);
        alert("Login failed");
      }
    }
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
              value={userName}
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
            placeholder="LoginButton"
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
