import React, { useState, useEffect } from "react";
import "./ChatBot.css";
import { Route, useHistory } from "react-router-dom";

import NavBar from "./NavBar";
import ImageCarousel from "./ImageCarousel";
import "./css/ImageCarousel.css"; // Import the CSS for the carousel
import "./css/TextOverlay.css"; // Import the CSS for the overlay

const HomePage = () => {
  const images = [
    "https://www.uchicagomedicine.org/-/media/images/ucmc/forefront/channel-pages/heart-and-vascular/universal/stock-doctor-with-patient-hero.jpg?h=385&as=1&hash=5F385370ACFD49AC72751A579B8340B7",
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREeKHOQnL8B4iPMT4-fR5CG1fxIPN1nQEF4A&usqp=CAU",
    "https://www.cdc.gov/drugoverdose/featured-topics/images/doctor-patient.jpg",
    "https://www.usnews.com/object/image/00000169-7d49-d24f-a37f-fdcfd61a0001/190314-olderpatientdoctortalking-stock.jpg?update-time=1552656670710&size=responsive640",
    // Add more image URLs as needed
  ];

  const interval = 3000;

  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    // Show the overlay after a delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-page">
      {/* <NavBar /> */}
      <div>
        <ImageCarousel images={images} interval={interval} />
      </div>
    </div>
  );
};

export default HomePage;
