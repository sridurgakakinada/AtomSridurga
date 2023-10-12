import React, { useState } from "react";
import "./css/NavBar.css"; // Import the CSS for styling
import UserLogin from "./UserLogin";

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="/medical-insurance.png"
          alt="Logo"
          style={{ height: "60px", width: "60px" }}
        />
      </div>
      <ul className="nav-links">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/services">Services</a>
        </li>
        {/* <li>
          <button onClick={handleLoginClick}>Login</button>
        </li> */}
      </ul>

      {/* Login Modal */}
      {showLogin && (
        <div className="login-modal">
          <UserLogin onClose={handleCloseLogin} />
        </div>
      )}
    </nav>

    // <div class="container-fluid">
    //   <nav class="navbar navbar-expand-lg navbar-light bg-light height:100px">
    //     {/* <nav className="navbar navbar-default navbar-fixed-top"> */}
    //     <img
    //       src="/medical-insurance.png"
    //       alt="Logo"
    //       style={{ height: "50px", width: "50px" }}
    //     />

    //     <a class="navbar-brand" href="#">
    //       Brand
    //     </a>
    //     <span />

    //     <div class="collapse navbar-collapse" id="navbarNav">
    //       <ul class="navbar-nav ml-auto">
    //         {" "}
    //         {/* Use ml-auto class to align links to the right */}
    //         <li class="nav-item active">
    //           <a class="nav-link" href="/">
    //             Home <span class="sr-only">(current)</span>
    //           </a>
    //         </li>
    //         <span />
    //         <li class="nav-item">
    //           <a class="nav-link" href="/about">
    //             About
    //           </a>
    //         </li>
    //         <li class="nav-item">
    //           <a class="nav-link" href="/services">
    //             Services
    //           </a>
    //         </li>
    //         <li class="nav-item">
    //           <button onClick={handleLoginClick}>Login</button>
    //         </li>
    //       </ul>
    //     </div>

    //     {showLogin && (
    //       <div class="login-modal">
    //         <UserLogin onClose={handleCloseLogin} />
    //       </div>
    //     )}
    //   </nav>
    // </div>
  );
}

export default NavBar;
