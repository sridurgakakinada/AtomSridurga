import React, { useEffect, useState } from "react";

import "./css/UserDashboard.css";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { useDoctorAnswers } from "./DoctorAnswersContext";

function UserDashboard() {
  const [doctorReplies, setDoctorReplies] = useState(false);
  const [doctorList, setDoctorList] = useState([]);
  const [patientList, setPatientList] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [id, setId] = useState(null);
  const { userName } = location.state;
  const [showDetails, setShowDetails] = useState(false);
  const handleNotificationClick = () => {
    console.log("the notification button was clicked");
    setShowDetails(!showDetails);
  };
  const handleCloseDetails = () => {
    setShowDetails(false);
  };
  const organ = [
    {
      name: "Heart",
      description: "The heart pumps blood through the circulatory system. ",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/954/954406.png",
    },
    {
      name: "Lungs",
      description:
        "Lungs facilitate the exchange of oxygen and carbon dioxide.",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/8986/8986317.png",
    },
    {
      name: "Brain",
      description: "The brain is the control center of the nervous system.",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/2864/2864309.png",
    },
    {
      name: "Liver",
      description: "The liver performs various vital functions in the body.",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/8855/8855321.png",
    },
    {
      name: "Kidneys",
      description: "Kidneys filter blood and remove waste and excess fluids.",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/508/508785.png",
    },
    {
      name: "Skin",
      description:
        "The skin is the body's largest organ, providing protection.",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/4148/4148578.png",
    },
    {
      name: "Eyes",
      description: "Eyes are sensory organs for vision and light perception.",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/2547/2547870.png",
    },
    {
      name: "Bones",
      description: "Bones support the body and protect internal organs.",

      imageUrl: "https://cdn-icons-png.flaticon.com/128/6800/6800942.png",
    },
  ];

  useEffect(() => {
    fetchDoctorReplies();
    fetchDoctorList();
    fetchPatientList();
  }, []);

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
      // console.log(data);
      {
        data.map((patient, index) => {
          if (patient.username === userName) {
            setId(index + 1);
            console.log("the index is : ", index + 1);
            // console.log(id);
          }
        });
      }
    } catch (error) {
      console.error("Error fetching doctor list:", error);
    }
  };
  const fetchDoctorList = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Services/Health/getDoctorList"
      );
      if (response.ok) {
        const data = await response.json();
        setDoctorList(data[0]); // Set the received doctor list to the state
      } else {
        throw new Error("Failed to fetch doctor list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDetailsClick = (organ, navigate) => {
    navigate(`/Organ-detail/${organ.name}`, {
      state: {
        organDetails: {
          username: userName,
          name: organ.name,
          description: organ.description,
          imageUrl: organ.imageUrl,
        },
      },
    });
  };
  const fetchDoctorReplies = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/Services/Health/getQueriesForDoc",
        {
          method: "POST", // Use the appropriate HTTP method (POST/GET/PUT) for fetching replies
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName: userName,
            id: id,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data["queryList"][0].reply);
        setDoctorReplies(data["queryList"][0].reply);
        // console.log(data["queryList"][0].reply);
      } else {
        throw new Error("Failed to fetch doctor's replies");
      }
    } catch (error) {
      console.error("Error:", error);
      // Handle error
    }
  };
  console.log(showDetails);

  return (
    <div>
      <div
        className={`notification-icon ${showDetails ? "hide" : ""}`}
        onClick={handleNotificationClick}
      >
        <img
          src="https://img.icons8.com/?size=96&id=4PGnQfak1C3H&format=png"
          alt="Doctor Icon"
          className="doctor-image"
        />

      </div>

      <div className={`notification-details ${showDetails ? "show" : ""}`}>
        <button className="close-btn" onClick={handleCloseDetails}>
          &#x2716; {/* Unicode for "X" symbol */}
        </button>
        <h2>User: {userName}</h2>
        <h2>Doctor: {doctorList.doctorName}</h2>
        <h2>Doctor Reply: {doctorReplies}</h2>
      </div>



      <div className="user-dashboard">


        {organ.map((organ, index) => (
          <div key={index} className="dashboard-card">
            <img
              src={organ.imageUrl}
              alt={organ.name}
              style={{ maxWidth: "100px", maxHeight: "100px" }}
            />
            <h3 style={{ color: "black" }}>{organ.name}</h3>
            <p style={{ color: "black" }}>{organ.description}</p>
            <button onClick={() => handleDetailsClick(organ, navigate)}>
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
