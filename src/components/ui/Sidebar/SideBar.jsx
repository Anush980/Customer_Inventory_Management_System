import React, { useState } from "react";
import WebLogo from "../../../assets/CIMS_logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LogoutCard from "../LogoutCard/LogoutCard";
import "./sideBar.css";

const SideBar = ({ isOpen, closeSidebar }) => {
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const userRole = user.role; // e.g., "owner", "admin", "staff"

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");  
    sessionStorage.removeItem("user");  
    navigate("/landingpage");
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="title">
            <img src={WebLogo} alt="logo" />
            <h2>O.R.M.S</h2>
          </div>
          <p>Online Retail management system</p>
        </div>
      </div>

      <div className="sidebar-menu">
        <div className="menu-title">
          <span>Business</span>
        </div>

        {/* Owner and Staff see all business sections */}
        {(userRole === "owner" || userRole === "staff") && (
          <>
            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              to="/dashboard"
            >
              <FontAwesomeIcon icon="tachometer-alt" className="menu-icon" />
              <span>Dashboard</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              to="/pos"
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon="cash-register" className="menu-icon" />
              <span>Point of sale</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              to="/inventory"
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon="boxes" className="menu-icon" />
              <span>Inventory</span>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              to="/customer"
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon="users" className="menu-icon" />
              <span>Customers</span>
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              to="/sales"
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon="book" className="menu-icon" />
              <span>Sales Book</span>
            </NavLink>

            {/* Only Owner sees Staffs */}
            {userRole === "owner" && (
              <NavLink
                className={({ isActive }) =>
                  `menu-item ${isActive ? "active" : ""}`
                }
                to="/staff"
                onClick={closeSidebar}
              >
                <FontAwesomeIcon icon="id-badge" className="menu-icon" />
                <span>Staffs</span>
              </NavLink>
            )}
          </>
        )}

        {/* Admin only sees Dashboard and Users */}
        {userRole === "admin" && (
          <>
            {/* <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              to="/dashboard"
            >
              <FontAwesomeIcon icon="tachometer-alt" className="menu-icon" />
              <span>Dashboard</span>
            </NavLink> */}
            <NavLink
              className={({ isActive }) =>
                `menu-item ${isActive ? "active" : ""}`
              }
              to="/user"
              onClick={closeSidebar}
            >
              <FontAwesomeIcon icon="users" className="menu-icon" />
              <span>Users</span>
            </NavLink>
          </>
        )}

        {/* Settings - visible to all */}
        <div className="menu-title">
          <span>Settings</span>
        </div>

        <NavLink
          className={({ isActive }) => `menu-item ${isActive ? "active" : ""}`}
          to="/profile"
          onClick={closeSidebar}
        >
          <FontAwesomeIcon icon="user" className="menu-icon" />
          <span>Profile</span>
        </NavLink>
        <NavLink
          className="menu-item"
          to="/landingpage"
          onClick={(e) => {
            e.preventDefault();
            setShowLogout(true);
          }}
        >
          <FontAwesomeIcon icon="sign-out-alt" className="menu-icon" />
          <span>Logout</span>
        </NavLink>
        {showLogout && (
          <LogoutCard
            onConfirm={() => {
              handleLogout();
              setShowLogout(false);
            }}
            closeWindow={() => setShowLogout(false)}
          />
        )}
      </div>
    </aside>
  );
};

export default SideBar;