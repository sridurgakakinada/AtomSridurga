// OrganDetail.jsx

import React from "react";
import "./css/OrganDetail.css";
import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserDashboard from "./UserDashboard";

function OrganDetail() {
  const [userQuery, setUserQuery] = useState(""); // State to hold user's query
  const [doctorList, setDoctorList] = useState([]);
  const [patientList, setPatientList] = useState([]);

  const { organName } = useParams();
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const [selectedDoctor, setSelectedDoctor] = useState(null); // State to track selected doctor
  const [key, setKey] = useState(null);

  useEffect(() => {
    const fetchDoctorList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/Services/Health/getDoctorList"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setDoctorList(data); // Assuming the response is an array of doctor details
        // console.log("The data is : ", data);
      } catch (error) {
        console.error("Error fetching doctor list:", error);
      }
    };

    const fetchPatientList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/Services/Health/getPatientList"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        setPatientList(data); // Assuming the response is an array of doctor details
        // console.log("The data is : ", data);
      } catch (error) {
        console.error("Error fetching doctor list:", error);
      }
    };

    fetchDoctorList();
    fetchPatientList();
  }, []);

  if (!state || !state.organDetails) {
    return <div>No organ details found.</div>;
  }

  const { username, name, description, imageUrl } = state.organDetails;

  const relatedDiseases = [
    "Arrhythmia: This condition refers to an irregular heartbeat. Arrhythmias can be caused by a number of factors, including CAD, heart failure, and certain medications.",
    "Heart valve disease: This condition occurs when one or more of the heart valves does not function properly. Heart valve disease can be caused by a number of factors, including infection, birth defects, and aging.",
    "Heart failure: This condition occurs when the heart is unable to pump enough blood to meet the body's needs. Heart failure can be caused by a number of factors, including CAD, high blood pressure, and diabetes.",
  ];
  const doctorDetails = {
    nameDoctor: "doc-maibu",
  };
  // const setDoctor(doctor,key){
  //   setSelectedDoctor(doctor.doctorName);
  //   setKey(key);
  // }
  const setDoctor = (doctorData) => {
    setSelectedDoctor(doctorData);
    console.log("the selected doctor is :", doctorData.doctorName);

    setKey(doctorData.key + 1);
    console.log(
      "teh doctor name is : ",
      selectedDoctor,
      "and the key is : ",
      key
    );
  };

  // const [userQuery, setUserQuery] = useState(" ");
  // doctorDecorator();

  ///Decorator Pattern

  // const doctorDecorator = (doctorDetails, relatedDiseases) => {
  //   return {
  //     ...doctorDetails,
  //     relatedDiseases,
  //     printDetails: function () {
  //       console.log(`Doctor: ${this.nameDoctor}`);
  //       console.log(`Specialization: ${this.specialization}`);
  //       console.log(`Hospital: ${this.hospital}`);
  //       console.log("Related Diseases:");
  //       this.relatedDiseases.forEach((disease) => console.log(`- ${disease}`));
  //     },
  //   };
  // };

  // Usage
  // const decoratedDoctor = doctorDecorator(doctorDetails, relatedDiseases);
  // decoratedDoctor.printDetails();

  // const handleFormSubmit = (event) => {
  //   event.preventDefault();
  //   // Display a message saying the doctor will get back to the user shortly
  //   alert(
  //     "Thank you for your question! The doctor will get back to you shortly."
  //   );
  //   navigate("/UserDashboard");
  // };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const queryData = {
        username: "maibu",
        patientId: "1",
        patientName: "Mahaboob Pasha Mohammad	",
        query: userQuery,
        docDesignation: "MBBS",
      };
      console.log("this is the query data:", queryData);

      const response = await fetch(
        "http://localhost:8080/Services/Health/SendQueryToDoctor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(queryData),
        }
      );

      if (response.ok) {
        alert(
          "Thank you for your question! The doctor will get back to you shortly."
        );
        navigate("/UserDashboard");
      } else {
        throw new Error("Error sending query to the server");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error. Please try again later.");
    }
  };

  return (
    <div>
      {/* <h1>Welcome, {username}!</h1>  */}
      <div className="organ-detail">
        <div className="left-section">
          <div className="organ-info">
            {imageUrl && ( // Check if imageUrl is available
              <img
                src={imageUrl}
                alt={name}
                style={{ maxWidth: "200px", maxHeight: "200px" }}
              />
            )}
            <h1>Organ Detail: {organName}</h1>
            {/* <p>Username: {username}</p> */}
            <p>Name: {name}</p>
            <p>Description: {description}</p>
            {/* Display other details of the organ */}
            <div className="related-diseases">
              {/* <h5>Related Diseases</h5>
              <ul>
                {relatedDiseases.map((disease, index) => (
                  <li key={index}>{disease}</li>
                ))}
              </ul> */}
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="right-section">
          <div className="doctor-info">
            <h3>Related Doctor</h3>
            {/* <p>{doctorDetails.nameDoctor}</p>  */}

            {doctorList.map((doctor, index) => (
              // <li key={index} onClick={() => setSelectedDoctor(doctor)}>
              //   {/* {doctor.doctorName} */}
              //   {organName === doctor.doctorDesignation
              //     ? `${doctor.doctorName}`
              //     : ""}
              // </li>
              <button className="doctor">
                <li
                  key={index}
                  onClick={() =>
                    setDoctor({ doctorName: doctor.doctorName, key: index })
                  }>
                  {organName === doctor.doctorDesignation
                    ? `${doctor.doctorName}`
                    : "No doctor is available at this moment"}
                </li>
              </button>
            ))}

            {/* <p>Specialization: {doctorDetails.specialization}</p>
            <p>Hospital: {doctorDetails.hospital}</p> */}
          </div>
          {/* <form className="ask-question-form" onSubmit={handleFormSubmit}>
            <h3>Ask a Question</h3>
            <div>
              <label>Your Question:</label>
              <textarea
                rows="4"
                value={userQuery}
                onChange={(e) => setUserQuery(e.target.value)} // Update userQuery state as the user types
              ></textarea>
            </div>
            <button type="submit">Submit</button>
          </form> */}
          {selectedDoctor && (
            <form className="ask-question-form" onSubmit={handleFormSubmit}>
              <h3>Ask a Question to {selectedDoctor.doctorName}</h3>
              <div>
                <label>Your Question:</label>
                <textarea
                  rows="4"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}></textarea>
              </div>
              <button type="submit">Submit</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default OrganDetail;
