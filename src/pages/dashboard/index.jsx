import { React } from "react";
import "./dashboard.css";
import StatsCard from "../../components/ui/StatsCard/StatsCard";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import Table from "../../components/ui/table/table";
import QuickStats from "../../components/dashboard/QuickStats/QuickStats";
import WindowSize from "../../components/ui/WindowSize/WindowSize";
import CrudTable from "../../components/ui/CrudTable/CrudTable";
import Layout from '../../components/ui/Layout/Layout'
import InventoryStats from '../../components/inventory/InventoryStats/InventoryStats';
import CustomerStats from "../../components/customer/customerStats/CustomerStats";
import InventoryStatsCard from "../../components/inventory/InventoryStatsCard/InventoryStatsCard";
import InventoryTable from "../../components/inventory/InventoryTable";
import { useInventory } from "../../hooks/useInventory";
import SalesTable from "../../components/sales/salesTable";
import { useSales } from "../../hooks/useSales";

const Dashboard = () => {
  const { width, height } = WindowSize();
  const { items, loading } = useInventory({
    search: "",
    category: "",
    stock: "",
    sort: "newest",
  });
  const { sales} = useSales({
    sort: "newest",
  });



  return (
    <>
      <Layout>
        <Pageheader title="Dashboard" showBtn={false} />

        <div className="stats">
          <StatsCard value="&#8377; 25000" change={12.5} type="revenue" />
          <StatsCard value=" 50" change={12.5} type="sales" />
          <CustomerStats />
          <InventoryStatsCard variant="low" />
        </div>

        <div className="data">
          <div className="data-left">
            <SalesTable
              data={sales?.slice(0, 5)}
              loading={loading}
              editable={false}
              showViewAll={true}
            />

            <InventoryTable
              data={items?.slice(0, 5)}
              loading={loading}
              editable={false}
            />

            <CrudTable />
          </div>
          <div className="data-right">
            {/* <p>
              Width: {width}px, Height: {height}px
            </p> */}
            <QuickStats />
            <InventoryStats variant="out" />
            <InventoryStats variant="low" />

          </div>
        </div>

      </Layout>
    </>
  );
};

export default Dashboard;
