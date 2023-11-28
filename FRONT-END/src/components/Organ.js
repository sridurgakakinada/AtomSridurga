// OrganDetail.jsx

import React from "react";
import { useParams, useLocation } from "react-router-dom";

function Organ() {
  const { organName } = useParams();
  const location = useLocation();
  const { state } = location;

  if (!state || !state.organDetails) {
    return <div>No organ details found.</div>;
  }

  const { username, name, description, imageUrl } = state.organDetails;

  return (
    <div>
      <h1>Organ Detail: {organName}</h1>
      <p>Username: {username}</p>
      <p>Name: {name}</p>
      <p>Description: {description}</p>
      {imageUrl && ( // Check if imageUrl is available
        <img
          src={imageUrl}
          alt={name}
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      )}
      {/* Display other details of the organ */}
    </div>
  );
}

export default Organ;
