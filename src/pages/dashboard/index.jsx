import React from "react";
import Navbar from "../../components/dashboard/Navbar/Navbar";
import SideBar from "../../components/dashboard/Sidebar/SideBar";
import "./dashboard.css"

const Dashboard = () => {
  
  return (
   <div className="dashboard-wrapper">
   <SideBar/>
   <div className="main-area">
    <Navbar/>
   </div>
   </div>
  );
};

export default Dashboard;
