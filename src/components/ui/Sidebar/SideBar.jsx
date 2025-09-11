import React, { useState } from "react";
import WebLogo from "../../../assets/CIMS_logo.png";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./sideBar.css";

const SideBar = ({isOpen,closeSidebar}) => {
   
  return (
     
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

          <NavLink className={({isActive})=>`menu-item ${isActive? "active":""}`} to="/dashboard">
            <FontAwesomeIcon icon="tachometer-alt" className="menu-icon" /><span> Dashboard</span>
          </NavLink>

          <NavLink className={({isActive})=>`menu-item ${isActive ? "active" :""}`} to="/inventory" onClick={closeSidebar}>
            <FontAwesomeIcon icon="boxes" className="menu-icon" />
            <span>Inventory</span>
          </NavLink>

          <NavLink className={({isActive})=>`menu-item ${isActive ? "active" :""}`} to="/customer" onClick={closeSidebar}>
            <FontAwesomeIcon icon="users" className="menu-icon" />
            <span>Customers</span>
          </NavLink>
          <NavLink className={({isActive})=>`menu-item ${isActive ? "active" :""}`} to="/sales" onClick={closeSidebar}>
            <FontAwesomeIcon icon="book" className="menu-icon" />
            <span>Sales Book</span>
          </NavLink>
          {/*setting starts from here*/}
          <div className="menu-title"><span>Settings</span></div>

          <NavLink className={({isActive})=>`menu-item ${isActive ? "active" :""}`} to="/settings" onClick={closeSidebar}>
            <FontAwesomeIcon icon="cog" className="menu-icon" />
            <span>Settings</span>
          </NavLink>

          <NavLink className={({isActive})=>`menu-item ${isActive ? "active" :""}`} to="/profile" onClick={closeSidebar}>
            <FontAwesomeIcon icon="user" className="menu-icon" />
            <span>Profile</span>
          </NavLink>
          <NavLink className="menu-item" to="/login" onClick={closeSidebar}>
            <FontAwesomeIcon icon="sign-out-alt" className="menu-icon" />
            <span>Logout</span>
          </NavLink>
        </div>
      </aside>
    
  )
}

export default SideBar