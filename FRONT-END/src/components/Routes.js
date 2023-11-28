import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import Routes
import HomePage from "./HomePage";
import UserLogin from "./UserLogin";
// Import your Login component
import GetStarted from "./GetStarted";
import Register from "./Register";
import DoctorLogin from "./DoctorLogin";
import UserDashboard from "./UserDashboard";
import DoctorDashboard from "./DoctorDashboard";
import OrganDetail from "./OrganDetail";

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />{" "}
        {/* Use 'element' instead of 'component' */}
        <Route path="/login" element={<UserLogin />} />{" "}
        <Route path="/getStarted" element={<GetStarted />} />{" "}
        {/* Use 'element' instead of 'component' */}
        <Route path="/Register" element={<Register />} />{" "}
        <Route path="/DoctorLogin" element={<DoctorLogin />} />{" "}
        <Route path="/UserDashboard" element={<UserDashboard />} />{" "}
        <Route path="/DoctorDashboard" element={<DoctorDashboard />} />{" "}
        {/* <Route path="/organ-detail/${organ.name}" element={<OrganDetail />} />{" "} */}
        <Route path="/organ-detail/:organName" element={<OrganDetail />} />
        {""}
        {/* <Route
  path="/organ-detail/:organName"
  element={<OrganDetail username={username} name={name} description={description} />}
/> */}
      </Routes>
    </Router>
  );
};

export default AppRoutes;
