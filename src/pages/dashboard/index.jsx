import { React} from "react";
import "./dashboard.css";
import StatsCard from "../../components/ui/StatsCard/StatsCard";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import Table from "../../components/ui/table/table";
import QuickStats from "../../components/dashboard/QuickStats/QuickStats";
import WindowSize from "../../components/ui/WindowSize/WindowSize";
import CrudTable from "../../components/ui/CrudTable/CrudTable";
import Layout from '../../components/ui/Layout/Layout'

const Dashboard = () => {
 const { width, height } = WindowSize();


  return (
    <>
   <Layout>
         <Pageheader title="Dashboard" btnTitle="Add Sales" variant="sales" />
          
          <div className="stats">
            <StatsCard value="&#8377; 25000" change={-12.5} type="revenue" />
            <StatsCard value="&#8377; 5000" change={12.5} type="sales" />
            <StatsCard value="200" change={12.5} type="customer" />
            <StatsCard value="25" change={-12.5} type="inventory" />
          </div>

          <div className="data">
            <div className="data-left">
              <Table limit = "5"/>
              <Table variant="inventory" limit = "5"/>
              {/* <CrudTable/> */}
            </div>
            <div className="data-right">
              <p>
        Width: {width}px, Height: {height}px
      </p>
              <QuickStats />
              <QuickStats />
              
            </div>
          </div>
       
   </Layout>
    </>
  );
};

export default Dashboard;
