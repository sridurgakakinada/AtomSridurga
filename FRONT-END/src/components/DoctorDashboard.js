import React, { useState, useEffect } from "react";
import "./css/DoctorDashboard.css"; // Create a CSS file for styling
import {useLocation, useNavigate } from "react-router-dom";
import { useDoctorAnswers } from "./DoctorAnswersContext";

function DoctorDashboard() {
  // const navigate = useNavigate();
  const { addDoctorAnswer } = useDoctorAnswers();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answerDatabase, setAnswerDatabase] = useState("");
  const [patientsData, setPatientsData] = useState([]);
  const [queriesData, setQueriesData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const { userName } = location.state;
  const [id, setId] = useState(null);
  const [questionID,setQuestionID]=useState(null);
  const [doctorList, setDoctorList] = useState([]);
  const[docdesignation,setDoctorDesignation]=useState("");

  useEffect(() => {
    // Fetch patient list from the server when the component mounts
    fetchPatients();
    fetchQueries();
    fetchDoctorList();
  }, []); // Empty dependency array to run the effect only once

    const fetchDoctorList = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/Services/Health/getDoctorList"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch");
        }

        const data = await response.json();
        // console.log(data);
        data.map((doctor,index)=>{
          if(doctor.doctorName==userName){
            setDoctorDesignation(doctor.doctorDesignation);
          }
        })
        
        setDoctorList(data); 
       
      } catch (error) {
        console.error("Error fetching doctor list:", error);
      }
    };

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Services/Health/getPatientList"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setPatientsData(data); // Set the retrieved patient list in state
        data.forEach((patient1, index) => {
          if (patient1.username === userName) {
            setId(index + 1);
            console.log("the ID is: ", index + 1);
            console.log("the full name is: ", patient1.username);
          }
        });
      } else {
        throw new Error("Failed to fetch patient list");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario: Display an error message or perform necessary actions
    }
  };


  const fetchQueries = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Services/Health/getQueriesForDoc",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            id: 1,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        setQueriesData(data);
        console.log(data);
      } else {
        throw new Error("Failed to fetch queries");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const sendQueries = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Services/Health/SaveDoctorReplyToPatientQuery",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: userName,
            id: id,
            docreply: answerDatabase,
            questionid: questionID,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setQueriesData(data);
      } else {
        throw new Error("Failed to fetch queries");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
    setSelectedQuery(null);
    console.log(patientsData);
    patientsData.forEach((patient1, index) => {
      if (patient1.username === patient.username) {
        setId(index + 1);
        // console.log("the ID is: ", index + 1);
        // console.log("the full name is: ", patient1.username);
      }
    });

    const matchingQuery =
      queriesData["queryList"]["0"].patientDetails.fullname ===
      patient.patientName;
    console.log(matchingQuery);
    console.log(queriesData["queryList"]["0"].questionId);
    setQuestionID(queriesData["queryList"]["0"].questionId);

    if (matchingQuery) {
      setSelectedQuery(queriesData["queryList"]["0"]);
    }
  };

  // const handleQueryClick = (query) => {
  //   setSelectedQuery(query);
  //   console.log("Selected Query:", selectedQuery);
  // };

  const handleAnswerSubmit = (answer) => {
    // Handle submitting the answer to the backend or update state as needed
    console.log("Submitted Answer:", answer);

    setAnswerDatabase(answer);
    setAnswerSubmitted(true);
    addDoctorAnswer(answer); // Add the answer to the context
    console.log(answerSubmitted);
    console.log(answerDatabase);
    sendQueries();
  };

  return (
    <div className="divDoctor">
      <div>
        <h1>Doctor {userName} Dashboard </h1>
        {/* <h2 style={{textAlign: 'center'}}>{userName}</h2> */}
      </div>

      <div className="doctor-dashboard">

        
        <div className="patients-list">
          <h2>Available Patients</h2>
          <ul>
          {patientsData
            .filter((patient) => patient.patientHealthHistory === docdesignation) // Filter patients based on matching doctor designation
            .map((patient, index) => (
              <li key={index} onClick={() => handlePatientClick(patient)}>
                {patient.patientName}
              </li>
            ))}
        </ul>
        </div>
        {/* Selected Patient's Queries */}
        {/* <div className="queries-list">
          <h2>Selected Patient's Queries</h2>
          {selectedPatient ? (
            <ul>
              {selectedPatient.queries.map((query) => (
                <li key={query.id} onClick={() => handleQueryClick(query)}>
                  {query.question}
                </li>
              ))}
            </ul>
          ) : (
            <p>Select a patient to view their queries.</p>
          )}
        </div> */}
        {/* <div className="queries-list">
          <h2>Selected Patient's Queries</h2>
          {selectedQuery ? (
            <ul>
              {selectedQuery.map((query) => (
                <li key={query.id} onClick={() => handleQueryClick(query)}>
                  {query.question}
                </li>
              ))}
              {selectedQuery.question}
            </ul>
          ) : (
            <p>No queries available for the selected patient.</p>
          )}
        </div> */}

        {/* Selected Query Details and Answer Form */}
        <div className="query-details">
          {selectedQuery ? (
            <>
              <h2>Query Details</h2>
              <p>{selectedQuery.question}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAnswerSubmitted(true);
                  sendQueries();
                }}>
                <label htmlFor="answer">Your Answer:</label>
                <textarea
                  id="answer"
                  name="answer"
                  rows="4"
                  required
                  onChange={(e) => {
                    e.preventDefault();
                    setAnswerDatabase(e.target.value);
                  }}
                />
                <button type="submit">Submit Answer</button>
              </form>
              {/* Dialog box to show the answer submission */}
              {answerSubmitted && (
                <div className="dialog-box">
                  <p>Your answer has been submitted to the patient.</p>
                  {/* You can add additional content or close button here */}
                </div>
              )}
            </>
          ) : (
            <p>Select a query to view details and post an answer.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;
