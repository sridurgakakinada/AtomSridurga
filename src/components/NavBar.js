import React from "react";
import "./css/NavBar.css"; // Import the CSS for styling

function NavBar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <img
          src="https://cdn3.vectorstock.com/i/1000x1000/14/42/healthcare-plus-sign-medical-symbol-icon-vector-28471442.jpg"
          alt="Logo"
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
        <li>
          <a href="/contact">Doctor Login</a>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
