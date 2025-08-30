import React, { useState } from "react";
import WebLogo from "../../../assets/CIMS_logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sideBar.css";

const SideBar = () => {
    const [isOpen, setIsOpen] = useState(false);
  return (
     <div className="sidebar-wrapper">
      <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <div className="title">
            <img src={WebLogo} alt="logo" />
            <h2>StockMate</h2>
            </div>
            <p>Manage Smarter, Not Harder</p>
          </div>
        </div>

        <div className="sidebar-menu">
          <div className="menu-title"><span>Business</span></div>

          <Link className="menu-item" to="/dashboard">
            <FontAwesomeIcon icon="tachometer-alt" className="menu-icon" /><span> Dashboard</span>
          </Link>

          <Link className="menu-item" to="/dashboard">
            <FontAwesomeIcon icon="boxes" className="menu-icon" />
            <span>Inventory</span>
          </Link>

          <Link className="menu-item" to="/dashboard">
            <FontAwesomeIcon icon="users" className="menu-icon" />
            <span>Customers</span>
          </Link>
          <Link className="menu-item" to="/dashboard">
            <FontAwesomeIcon icon="book" className="menu-icon" />
            <span>Sales Book</span>
          </Link>
          {/*setting starts from here*/}
          <div className="menu-title"><span>Settings</span></div>

          <Link className="menu-item" to="/dashboard">
            <FontAwesomeIcon icon="cog" className="menu-icon" />
            <span>Settings</span>
          </Link>

          <Link className="menu-item" to="/dashboard">
            <FontAwesomeIcon icon="user" className="menu-icon" />
            <span>Profile</span>
          </Link>
          <Link className="menu-item" to="/dashboard">
            <FontAwesomeIcon icon="sign-out-alt" className="menu-icon" />
            <span>Logout</span>
          </Link>
        </div>
      </aside>
    </div>
  )
}

export default SideBar