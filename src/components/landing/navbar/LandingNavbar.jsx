import React, { useState } from "react";
import logo from "../../../assets/CIMS_logo.png";
import Button from "../../ui/Button/Button";
import "./landingNavbar.css";
import { useNavigate } from "react-router-dom";


const LandingNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="landing-navbar">
      <div className="landing-navbar-content">
        <div className="logo">
          <div className="landing-hamburger" onClick={() => setIsOpen(!isOpen)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              className="size-7"
            >
              <path
                stroke="#0A090B"
                strokeLinecap="round"
                strokeWidth="2"
                d="M10.5 18H20M4 12h16M4 6h16"
              />
            </svg>
          </div>
          <img src={logo} alt="photo" />
          <div className="logo-title">
            <h1>
              <a href="/">ORMS</a>
            </h1>
            <p>Manage Smarter, Not harder</p>
          </div>
        </div>

        <ul className={`nav-links ${isOpen? "open": ""}`}>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
         

          <li>
            <a href="#footer">Contact</a>
          </li>
        </ul>
        <div className="nav-buttons">
          <Button
            type="primary"
            onClick={() => {
              navigate("/register");
            }}
          >
           Get Started
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingNavbar;
