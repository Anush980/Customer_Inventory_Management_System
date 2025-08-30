import {React,useState} from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebLogo from "../../../assets/CIMS_logo.png";
import "./navbar.css";

const Navbar = ({toggleSidebar}) => {
    const [notification ,setNotification] = useState("6");
  return (
    <div className="navbar-wrapper">
    <div className="navbar">
      <div className="navbar-logo">
        <img src={WebLogo} alt="logo" />
      </div>
      <div className="search-bar">
        <input type="text" placeholder="Search..."></input>
        <FontAwesomeIcon icon="search" className="search-icon" />
      </div>
<div className="navbar-left">
      <div className="user-menu">
        <div className="notification">
            <FontAwesomeIcon icon="bell"/>
            <span className="badge">{notification}</span>
        </div>
        <div className="user-profile">
            <FontAwesomeIcon icon="user"/>
            
        </div>
        </div>
         <div className="hamburger" onClick={toggleSidebar}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" className="size-7">
      <path stroke="#0A090B" strokeLinecap="round" strokeWidth="2" d="M10.5 18H20M4 12h16M4 6h16"/>
    </svg>
  </div>
      </div>
    </div>
    </div>
  );
};

export default Navbar;
