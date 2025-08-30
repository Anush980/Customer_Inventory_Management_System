import React from "react";
import "./homepage.css";
import WebLogo from "../../assets/CIMS_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Dashboard = () => {
  return (
    <>
      <div className="sidebar">
        <div className="sidebar-header">
          <div className="sidbar-logo">
            <img src={WebLogo} alt="logo" />
            <h2>CIMS</h2>
          </div>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title">OVERVIEW</div>
         <FontAwesomeIcon icon="tachometer-alt"/>
          <Link className="menu-item" to="/dashboard">Dashboard</Link>
        </div>
        </div>
    </>
  );
};

export default Dashboard;
