import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import GetStarted from "./GetStarted";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    fullname: "",
    emailid: "",
    phonenumber: "",
    password: "",
    repeatpassword: "",
    patientHistory: "",
  });
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    // Basic email validation using regex
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    console.log("in this validate email function");
    return regex.test(email);
  };
  const validatePassword = (password) => {
    // Password validation: at least 10 characters and contains special characters
    const regex = /^(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{10,}$/;
    console.log("in this validate password function");

    return regex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    // Validation checks
    if (!validateEmail(formData.emailid)) {
      console.log("the validate email function is being called");
      setResponseMessage("Please enter a valid email address.");
      return;
    }

    if (!validatePassword(formData.password)) {
      setResponseMessage(
        "Password should be at least 10 characters and contain special characters."
      );
      alert(
        "Password should be at least 10 characters and contain special characters."
      );
      console.log("the validate password function is called");

      return;
    }

    if (formData.password !== formData.repeatpassword) {
      setResponseMessage("Passwords do not match.");
      console.log("the validate repeat password function is called");

      return;
    }

    // Create a new user object from the form data
    const newUser = {
      username: formData.username,
      fullname: formData.fullname,
      patientHistory: formData.patientHistory,
      emailid: formData.emailid,
      mobileNumber: formData.phonenumber,
      password: formData.password,
      repeatPassword: formData.repeatpassword,
    };

    console.log("Data to be sent to the backend:", newUser); // Log the data

    try {
      // Send a POST request to the backend
      const response = await fetch(
        "http://localhost:8080/Services/Health/RegisterPatient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
        // Request was successful
        const data = await response.json();
        setResponseMessage(data.message); // Display the response message from the server
        navigate("/GetStarted");
      } else {
        // Request failed
        setResponseMessage("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>username
      <section class="vh-10" style={{ backgroundColor: "#90EE90" }}>
        <div class="container h-50">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-12 col-xl-11">
              <div class="card text-black" style={{ borderradius: "15px" }}>
                <div class="card-body p-md-5">
                  <div class="row justify-content-center">
                    <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form class="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              id="usernameInput"
                              class="form-control"
                              name="username"
                              placeholder="Your userName"
                              value={formData.username}
                              onChange={handleChange}
                              required
                            />
                            <label class="form-label" for="form3Example1c">
                              USER NAME
                            </label>
                          </div>
                        </div>
                        {/* <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              // id="form3Example1c"
                              class="form-control"
                              name="patientHistory"
                              placeholder="History of diseases"
                              value={formData.patientHistory}
                              onChange={handleChange}
                              required
                            />
                            <label class="form-label" for="form3Example1c">
                              HISTORY OF DISEASES
                            </label>
                          </div>
                        </div> */}
                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <select
                              class="form-select"
                              name="patientHistory"
                              value={formData.patientHistory}
                              onChange={handleChange}
                              required>
                              <option value="" disabled selected>
                                Select Disease
                              </option>
                              {/* <!-- Diseases related to organs --> */}
                              {/* <optgroup label="Heart"> */}
                              <option value="heart">Heart</option>
                              <option value="eyes">EYES</option>
                              <option value="eyes">BRAIN</option>
                              <option value="eyes">SKIN</option>
                              <option value="eyes">LIVER</option>
                              <option value="eyes">BONES</option>
                              <option value="eyes">LUNGS</option>
                              <option value="eyes">DIGESTION</option>
                              <option value="eyes">MUSCLES</option>
                              {/* <!-- Add more heart-related diseases as needed --> */}
                              {/* </optgroup> */}
                              {/* <optgroup label="Lungs"> */}
                              {/* <option value="lung_disease_1">
                                  Lung Disease 1
                                </option>
                                <option value="lung_disease_2">
                                  Lung Disease 2
                                </option> */}
                              {/* <!-- Add more lung-related diseases as needed --> */}
                              {/* </optgroup> */}
                              {/* <!-- Add other organs and their related diseases using <optgroup> and <option> --> */}
                            </select>
                            <label class="form-label" for="form3Example1c">
                              HISTORY OF DISEASES
                            </label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="text"
                              // id="form3Example1c"
                              class="form-control"
                              name="fullname"
                              placeholder="Your Full Name"
                              value={formData.fullname}
                              onChange={handleChange}
                              required
                            />
                            <label class="form-label" for="form3Example1c">
                              FULL NAME
                            </label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="email"
                              // id="form3Example3c"
                              class="form-control"
                              name="emailid"
                              placeholder="Your Email"
                              value={formData.emailid}
                              onChange={handleChange}
                              required
                            />
                            <label class="form-label" for="form3Example3c">
                              EMAIL ID
                            </label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="TEXT"
                              // id="form3Example1c"
                              class="form-control"
                              name="phonenumber"
                              placeholder="Phone Number"
                              value={formData.phonenumber}
                              onChange={handleChange}
                              required
                            />
                            <label class="form-label" for="form3Example1c">
                              PHONE NUMBER
                            </label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              // id="form3Example4c"
                              class="form-control"
                              name="password"
                              placeholder="Password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                            <label class="form-label" for="form3Example4c">
                              PASSWORD
                            </label>
                          </div>
                        </div>

                        <div class="d-flex flex-row align-items-center mb-4">
                          <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div class="form-outline flex-fill mb-0">
                            <input
                              type="password"
                              // id="form3Example4cd"
                              placeholder = "Repeat Password"
                              name="repeatpassword"
                              class="form-control"
                              value={formData.repeatpassword}
                              onChange={handleChange}
                              required
                            />
                            <label class="form-label" for="form3Example4cd">
                              Repeat your password
                            </label>
                          </div>
                        </div>

                        <div class="form-check d-flex justify-content-center mb-5">
                          <input
                            class="form-check-input me-2"
                            type="checkbox"
                            value=""
                            id="form2Example3c"
                          />
                          <label class="form-check-label" for="form2Example3">
                            I agree all statements in
                          </label>
                          <br />
                          <a href="#!">Terms of service</a>
                        </div>

                        <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" class="btn btn-primary btn-lg">
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://img.freepik.com/free-vector/health-professional-team-illustration_23-2148509384.jpg?w=2000"
                        class="img-fluid"
                        alt="Sample image"
                        style={{
                          width: "500px",
                          height: "600px",
                          borderRadius: "10px",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Register;
