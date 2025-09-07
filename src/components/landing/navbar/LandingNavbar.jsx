import React from "react";
import logo from "../../../assets/CIMS_logo.png";
import Button from "../../ui/Button/Button";
import "./landingNavbar.css";

const LandingNavbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="logo">
          <img src={logo} alt="photo" />
          <div className="logo-title">
            <h1>
              <a href="#home">StockMate</a>
            </h1>
            <p>Manage Smarter, Not harder</p>
          </div>
        </div>

        <ul className="nav-links">
          <li>
            <a href="#home">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#usuage">How to use </a>
          </li>
          <li>
            <a href="#contact">Contact</a>
          </li>
        </ul>
        <div className="nav-buttons">
          <Button type="primary">Get Started</Button>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
