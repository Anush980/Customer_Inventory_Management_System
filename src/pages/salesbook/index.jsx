import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import TotalSalesStats from "../../components/sales/TotalSalesStats";
import "./salesbookPage.css";
import SalesTable from "../../components/sales/salesTable";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import SalesViewModal from "../../components/sales/SalesViewModal";
import TopSalesCard from "../../components/sales/TopSales";
import RevenueStats from "../../components/sales/RevenueStats";

import { useSales } from "../../hooks/useSales";

const SalesBookPage = () => {
  const [viewSale, setViewSale] = useState(null);
  const [deleteSale, setDeleteSale] = useState(null);

  const [showView, setShowView] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState(null);

  const { sales, loading, deleteSaleById } = useSales({
    sort: "newest",
  });


  const handleView = (sale) => {
    setViewSale(sale);
    setShowView(true);
  };


  const handleDelete = (sale) => {
    setDeleteSale(sale);
    setShowConfirm(true);
  };


  const confirmDelete = async () => {
    if (!deleteSale) return;

    try {
      await deleteSaleById(deleteSale._id);
      setSnackbar({ message: "Sale deleted successfully", type: "success" });
    } catch (err) {
      console.error(err);
      setSnackbar({ message: "Delete failed", type: "error" });
    } finally {
      setShowConfirm(false);
      setDeleteSale(null);
    }
  };

  return (
    <Layout>
      <Pageheader title="Sales Management" showBtn={false} />
      <div className="stats-card">
        <RevenueStats variant="daily" />
        <TotalSalesStats variant="daily"/>
      </div>



      <div className="sales-content-wrapper" style={{ display: "flex", gap: "20px" }}>
        <div className="sales-left" style={{ flex: 3 }}>
          <SalesTable
            data={sales}
            loading={loading}
            editable={true}
            onView={handleView}
            onDelete={handleDelete}
            showViewAll={false}
          />
        </div>

        <div className="sales-right" style={{ flex: 1 }}>
          <TopSalesCard sales={sales} limit={5} />
        </div>
      </div>




      {showView && (
        <SalesViewModal
          sale={viewSale}
          onClose={() => setShowView(false)}
        />
      )}


      {showConfirm && (
        <ConfirmCard
          closeWindow={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}


      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </Layout>
  );
};

export default SalesBookPage;
