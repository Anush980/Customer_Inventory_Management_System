import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import WebLogo from "../../../assets/CIMS_logo.png";
import notificationsData from "../../../data/dummyNotifications/notificationData";
import "./navbar.css";
import { NavLink } from "react-router-dom";
import notifications from "../../../data/dummyNotifications/notificationData";

const Navbar = ({ toggleSidebar }) => {
  const [notifications, setNotifications] = useState(notificationsData);
  const [notificationPanel, setNotificationPanel] = useState(false);
  const toggleNotifcationPanel = () => {
    setNotificationPanel(!notificationPanel);
  };

  return (
    <div className="navbar-wrapper">
      <div className="navbar">
        <div className="navbar-logo">
          <img src={WebLogo} alt="logo" />
        </div>
        <div className="search-bar">
          Retail Management System
          {/* <input type="text" placeholder=""></input>
          <FontAwesomeIcon icon="search" className="search-icon" /> */}
        </div>
        <div className="navbar-left">
          <div className="user-menu">
            <div className="notification">
              <FontAwesomeIcon
                icon="bell"
                className="icon"
                onClick={toggleNotifcationPanel}
              />
              <span className="badge">{notifications.length}</span>
              {notificationPanel && (
                <div className="notification-panel">
                  <div className="notification-header">
                    <h3>Notifications</h3>
                  </div>
                  {notifications.map((notif) => (
                    <div className="notification-item" key={notif.id}>
                      <p>{notif.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <NavLink to="/profile" className="user-profile">
  <FontAwesomeIcon icon="user" className="icon" />
</NavLink>
          </div>
          <div className="hamburger" onClick={toggleSidebar}>
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
