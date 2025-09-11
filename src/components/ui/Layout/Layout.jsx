import { React, useState } from "react";
import Navbar from "../Navbar/Navbar";
import SideBar from "../Sidebar/SideBar";
import "./layout.css";

const Dashboard = ({children}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
    <div className="layout">
      <SideBar isOpen={isOpen} closeSidebar={closeSidebar} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
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
