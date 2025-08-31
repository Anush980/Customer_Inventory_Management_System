import { React, useState } from "react";
import Navbar from "../../components/dashboard/Navbar/Navbar";
import SideBar from "../../components/dashboard/Sidebar/SideBar";
import "./dashboard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import Pageheader from "../../components/dashboard/PageHeader/Pageheader";
import Table from "../../components/table/table";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const closeSidebar = () => setIsOpen(false);
  return (
    <div className="dashboard-wrapper">
      <SideBar isOpen={isOpen} closeSidebar={closeSidebar} />
      <div className="main-area">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="main-content">
          <Pageheader title="Dashboard" btnTitle="New Order" />
          <div className="stats-cards">
            <StatsCard value="&#8377; 25000" change={-12.5} type="revenue" />
            <StatsCard value="&#8377; 5000" change={12.5} type="sales" />
            <StatsCard value="200" change={12.5} type="customer" />
            <StatsCard value="25" change={-12.5} type="inventory" />
          </div>
          <Table />
          <Table variant="inventory" editable="true" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
