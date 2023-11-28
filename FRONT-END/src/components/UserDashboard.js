import React, { useEffect } from "react";
// import "./css/UserDashboard.css"; // Make sure to create the corresponding CSS file

import "./css/UserDashboard.css";
import { Link } from "react-router-dom";
import { useLocation, useHistory } from "react-router-dom";
import { Button } from "bootstrap";
import { useNavigate } from "react-router-dom";

function UserDashboard() {
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
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/954/954406.png" // Replace with your image URL
      //     alt="Card 1"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/954/954406.png",
    },
    {
      name: "Lungs",
      description:
        "Lungs facilitate the exchange of oxygen and carbon dioxide.",
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/8986/8986317.png" // Replace with your image URL
      //     alt="Card 2"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/8986/8986317.png",
    },
    {
      name: "Brain",
      description: "The brain is the control center of the nervous system.",
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/2864/2864309.png" // Replace with your image URL
      //     alt="Card 3"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/2864/2864309.png",
    },
    {
      name: "Liver",
      description: "The liver performs various vital functions in the body.",
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/8855/8855321.png" // Replace with your image URL
      //     alt="Card 4"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/8855/8855321.png",
    },
    {
      name: "Kidneys",
      description: "Kidneys filter blood and remove waste and excess fluids.",
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/508/508785.png" // Replace with your image URL
      //     alt="Card 5"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/508/508785.png",
    },
    {
      name: "Skin",
      description:
        "The skin is the body's largest organ, providing protection.",
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/4148/4148578.png" // Replace with your image URL
      //     alt="Card 6"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/4148/4148578.png",
    },
    {
      name: "Eyes",
      description: "Eyes are sensory organs for vision and light perception.",
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/2547/2547870.png" // Replace with your image URL
      //     alt="Card 7"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/2547/2547870.png",
    },
    {
      name: "Bones",
      description: "Bones support the body and protect internal organs.",
      // image: (
      //   <img
      //     src="https://cdn-icons-png.flaticon.com/128/6800/6800942.png" // Replace with your image URL
      //     alt="Card 8"
      //   />
      // ),
      imageUrl: "https://cdn-icons-png.flaticon.com/128/6800/6800942.png",
    },
    // Add more organs and descriptions here...
  ];
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
        <h1>Welcome, {username}!</h1>{" "}
      </div>
      <div className="user-dashboard">
        {/* {organ.map((organ, index) => (
          <Link
            key={index}
            to={{
              pathname: `/organ/${organ.name}`,
              state: {
                organDetails: {
                  username: username,
                  name: organ.name,
                  description: organ.description,
                  // imageUrl: organ.imageUrl, // Replace with URL string for the image
                },
              },
            }}>
              
            <div className="dashboard-card">
              <img
                src={organ.imageUrl}
                alt={organ.name}
                style={{ maxWidth: "100px", maxHeight: "100px" }}
              />
              <h3 style={{ color: "black" }}>{organ.name}</h3>
              <p style={{ color: "black" }}>{organ.description}</p>
            </div>
          </Link>
        ))} */}

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
