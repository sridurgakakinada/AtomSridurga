import React, { useEffect, useState } from "react";
// import "./css/UserDashboard.css"; // Make sure to create the corresponding CSS file

import "./css/UserDashboard.css";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";
import { useDoctorAnswers } from "./DoctorAnswersContext";

function UserDashboard(props) {
  // If you receive props from a parent component
  // Ensure receivedProps are defined from the props received
  const { receivedProps } = props;
  const { doctorAnswers } = useDoctorAnswers();

  const [doctorReplies, setDoctorReplies] = useState(false);
  const [doctorList, setDoctorList] = useState([]);

  // const [userName, setUsername] = useState("");
  const location = useLocation();
  const { state } = location;
  const username = state && state.username ? state.username : "";
  console.log("the user name is : ", username);
  const navigate = useNavigate();

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
        // Handle error
      }
    };

    const fetchDoctorReplies = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/Services/Health/getQueriesForDoc",
          {
            method: "POST", // Use the appropriate HTTP method (POST/GET/PUT) for fetching replies
            headers: {
              "Content-Type": "application/json",
              // Include other necessary headers
            },
            // Include any necessary request body or parameters
            body: JSON.stringify({
              userName: "doc",
              id: "1",
            }), // Assuming receivedProps contains the username
          }
        );

        if (response.ok) {
          const data = await response.json();
          setDoctorReplies(data["queryList"][0].reply);
        } else {
          throw new Error("Failed to fetch doctor's replies");
        }
      } catch (error) {
        console.error("Error:", error);
        // Handle error
      }
    };

    fetchDoctorReplies();
    fetchDoctorList();
  }, []); // Fetc

  const handleDetailsClick = (organ, navigate) => {
    navigate(`/Organ-detail/${organ.name}`, {
      state: {
        organDetails: {
          username: username,
          name: organ.name,
          description: organ.description,
          imageUrl: organ.imageUrl,
          // imageUrl: organ.imageUrl, // Add URL string for the image if needed
        },
      },
    });
  };

  return (
    <div>
      <div className="welcome">
        {/* <h1>Welcome, {username}!</h1>{" "} */}
        <div className="doctor-answers">
          <p>
            {doctorReplies && (
              <h2>
                {doctorList.doctorName} : {doctorList.doctorDesignation}
              </h2>
            )}
            {doctorReplies && <h2>Doctor Answers: {doctorReplies}</h2>}
          </p>
        </div>
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
