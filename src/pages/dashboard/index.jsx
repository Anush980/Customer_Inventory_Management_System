import { React, useState } from "react";
import Navbar from "../../components/dashboard/Navbar/Navbar";
import SideBar from "../../components/dashboard/Sidebar/SideBar";
import "./dashboard.css";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import Pageheader from "../../components/dashboard/PageHeader/Pageheader";
import Table from "../../components/table/table";
import QuickStats from "../../components/dashboard/QuickStats/QuickStats";
import WindowSize from "../../components/ui/WindowSize/WindowSize";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
 const { width, height } = WindowSize();
  const toggleSidebar = () => setIsOpen(!isOpen);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
    <div className="dashboard">
      <SideBar isOpen={isOpen} closeSidebar={closeSidebar} />
      <div className="main">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="content">
          <Pageheader title="Dashboard" btnTitle="New Order" />
          
          <div className="stats">
            <StatsCard value="&#8377; 25000" change={-12.5} type="revenue" />
            <StatsCard value="&#8377; 5000" change={12.5} type="sales" />
            <StatsCard value="200" change={12.5} type="customer" />
            <StatsCard value="25" change={-12.5} type="inventory" />
          </div>

          <div className="data">
            <div className="data-left">
              <Table />
              <Table variant="inventory" editable />
            </div>
            <div className="data-right">
              <p>
        Width: {width}px, Height: {height}px
      </p>
              <QuickStats />
              <QuickStats />
              
            </div>
          </div>
        </div>
      </div>
      
    </div>
    <footer className="footer">

      </footer>
    </>
  );
};

export default Dashboard;
