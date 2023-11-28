// OrganDetail.jsx

import React from "react";
import "./css/OrganDetail.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

function OrganDetail(props) {
  const location = useLocation();
  const { state } = location;
  const username = props.username;
  console.log("the user name is : ", username);

  // const username = state && state.username ? state.username : "";
  const name = state && state.name ? state.name : "";
  const description = state && state.description ? state.description : "";
  const imageUrl = state && state.imageUrl ? state.imageUrl : "";

  const relatedDiseases = [
    "Arrhythmia: This condition refers to an irregular heartbeat. Arrhythmias can be caused by a number of factors, including CAD, heart failure, and certain medications.",
    "Heart valve disease: This condition occurs when one or more of the heart valves does not function properly. Heart valve disease can be caused by a number of factors, including infection, birth defects, and aging.",
    "Heart failure: This condition occurs when the heart is unable to pump enough blood to meet the body's needs. Heart failure can be caused by a number of factors, including CAD, high blood pressure, and diabetes.",
  ];
  const doctorDetails = {
    nameDoctor: "Dr. John Doe",
    specialization: "Cardiologist",
    hospital: "City Hospital",
  };
  const [userQuery, setUserQuery] = useState(" ");
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

  return (
    <div className="organ-detail">
      {/* Left Section */}
      <div className="left-section">
        <div className="organ-info">
          <img
            src="https://cdn-icons-png.flaticon.com/128/954/954406.png"
            alt="Card 1"
          />
          {/* <h1>Heart</h1> */}
          <h1>{name}</h1>
          {/* <h3>The heart pumps blood through the circulatory system.</h3> */}
          <h3>{description}</h3>
        </div>
        <div className="related-diseases">
          <h5>Related Diseases</h5>
          <ul>
            {relatedDiseases.map((disease, index) => (
              <li key={index}>{disease}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Section */}
      <div className="right-section">
        <div className="doctor-info">
          <h3>Related Doctor</h3>
          <p>{doctorDetails.nameDoctor}</p>
          <p>Specialization: {doctorDetails.specialization}</p>
          <p>Hospital: {doctorDetails.hospital}</p>
        </div>
        <form className="ask-question-form">
          <h3>Ask a Question</h3>
          <div>
            <label>Your Question:</label>
            <textarea rows="4"></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default OrganDetail;
