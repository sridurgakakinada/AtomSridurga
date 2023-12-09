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
  const [key1, setKey1] = useState(null);
  const [key2, setKey2] = useState(null);
  const [fullname,setFullname]=useState(null);
  const [userName,setUserName]=useState(null);
  const [designation,setDesignation]=useState(null);

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
        // console.log("The data is : ", doctorList);
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
        console.log(data);
        {data.map((patient,index)=> {
          if(patient.username===username){
            setKey2(index+1);
            setFullname(patient.patientName);
            setUserName(patient.username);
            console.log("the index is : ",index+1)
            console.log(key2);
            console.log("the full name is : ",patient.patientName)}
          })}

      } catch (error) {
        console.error("Error fetching doctor list:", error);
      }
    };

    fetchDoctorList();
    fetchPatientList();
  }, []); 
 console.log(doctorList);
 

  if (!state || !state.organDetails) {
    return <div>No organ details found</div>;
  }

  const { username, name, description, imageUrl } = state.organDetails;

  const setDoctor = (doctorData) => {
    setSelectedDoctor(doctorData);
  
    setKey1(doctorData.index + 1);

    console.log("the selcedt doctor data is :",doctorData,"the key is:",doctorData.index);

    // console.log("the selected doctor is :", doctorData.doctorName);
    console.log("the selected doctor key is :", doctorData.index+1);
  };

  
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const queryData = {
        username: username,
        patientId: key2,
        patientName:fullname,
        query: userQuery,
        docDesignation: selectedDoctor.organName,
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
        navigate("/UserDashboard", { state: { userName } });
      } else {
        throw new Error("Error sending query to the server");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("There was an error. Please try again later.");
    }
  };

  // console.log("the pateints list is: ",patientList);

  return (
    <div className="div1">

      <h1>{username}</h1>
      
      <div className="organ-detail">
        
        {/* <h1>{patientList[0][0]}</h1> */}
        
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
              
            </div>
          </div>
        </div>
        {/* Right Section */}
        <div className="right-section">
  <div className="doctor-info">
    <h3>Related Doctor</h3>
     <ul>
        {doctorList.map((doctor, index) => (

        doctor.doctorDesignation === organName && (
        <button className="doctor" key={index}>
        <li onClick={() => setDoctor({ doctorName: doctor.doctorName,index,organName})}>
          {doctor.doctorName}
        </li>
        </button>
        )
        ))}
      </ul>
  </div>
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
