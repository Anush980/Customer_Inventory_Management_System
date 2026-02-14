import { React, useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/SideBar";
import "./layout.css";

const Dashboard = ({ children, hideNavbar = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  // Listen to screen resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <div className="layout">
        <SideBar isOpen={isOpen} closeSidebar={closeSidebar} />
        <div className="main">
          {/* Show Navbar if NOT hiding it OR if mobile */}
          {(!hideNavbar || isMobile) && <Navbar toggleSidebar={toggleSidebar} />}
          <div className="content">
            {children}
          </div>
        </div>
      </div>
      <div className="footer"></div>
    </>
  );
};

export default Dashboard;
