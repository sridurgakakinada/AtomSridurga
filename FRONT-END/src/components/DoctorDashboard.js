import React, { useState, useEffect } from "react";
import "./css/DoctorDashboard.css"; // Create a CSS file for styling
import { useNavigate } from "react-router-dom";
import { useDoctorAnswers } from "./DoctorAnswersContext";

function DoctorDashboard() {
  // const navigate = useNavigate();
  const { addDoctorAnswer } = useDoctorAnswers();
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [selectedQuery, setSelectedQuery] = useState(null);

  const [answerSubmitted, setAnswerSubmitted] = useState(false);
  const [answerDatabase, setAnswerDatabase] = useState("");
  const navigate = useNavigate();

  const [patientsData, setPatientsData] = useState([]);
  const [queriesData, setQueriesData] = useState([]);

  // // Example data structure
  // const patientsData = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     queries: [
  //       { id: 1, question: "How can I improve my health?" },
  //       { id: 2, question: "What should I do to reduce stress?" },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     queries: [
  //       { id: 3, question: "Is my diet plan suitable for my condition?" },
  //       { id: 4, question: "What exercises can I do for back pain?" },
  //     ],
  //   },
  //   // Add more patient data as needed
  // ];

  useEffect(() => {
    // Fetch patient list from the server when the component mounts
    fetchPatients();
    fetchQueries();
  }, []); // Empty dependency array to run the effect only once

  const fetchPatients = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Services/Health/getPatientList"
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setPatientsData(data); // Set the retrieved patient list in state
      } else {
        throw new Error("Failed to fetch patient list");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error scenario: Display an error message or perform necessary actions
    }
  };

  // const handlePatientClick = (patient) => {
  //   setSelectedPatient(patient);
  //   setSelectedQuery(null); // Clear selected query when selecting a new patient
  //   console.log("Selected Patient:", selectedPatient);
  // };
  // const handlePatientClick = (patient) => {
  //   setSelectedPatient(patient);
  //   setSelectedQuery(null);
  //   console.log("Selected Patient:", selectedPatient);
  // };

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
            userName: "doc",
            id: "1",
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        setQueriesData(data);
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
            username: "doc",
            id: "1",
            docreply: answerDatabase,
            questionid: "1",
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        // console.log(data);
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

    const matchingQuery =
      queriesData["queryList"]["0"].patientDetails.fullname ===
      patient.patientName;
    console.log(matchingQuery);

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
    <div>
      <div>
        <h1>Doctor Dashboard</h1>
      </div>

      <div className="doctor-dashboard">
        {/* Available Patients List */}
        <div className="patients-list">
          <h2>Available Patients</h2>
          <ul>
            {patientsData.map((patient, index) => (
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
