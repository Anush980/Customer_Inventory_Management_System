import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import StatsCard from "../../components/ui/StatsCard/StatsCard";
import "./salesbookPage.css";
import SalesTable from "../../components/sales/salesTable";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import CrudTable from "../../components/ui/CrudTable/CrudTable";

import { useSales } from "../../hooks/useSales";

const SalesBookPage = () => {
  const [viewSale, setViewSale] = useState(null);
  const [deleteSale, setDeleteSale] = useState(null);

  const [showView, setShowView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [snackbar, setSnackbar] = useState(null);


  const { sales, loading, deleteSaleById } = useSales({
    sort: "newest",
  });


  const handleView = (row) => {
    setViewSale(row);
    setShowView(true);
  };

  
  const handleDelete = (row) => {
    setDeleteSale(row);
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
      <Pageheader title="Sales Management" btnTitle="Add Sale" variant="sales" />

      <StatsCard value="10000" change={5} type="sales" />

     
      <SalesTable
        data={sales}
        loading={loading}
        editable={true}
        onView={handleView}
        onDelete={handleDelete}
        showViewAll={false}
      />

     
      {showView && (
        <CrudTable
          closeWindow={() => setShowView(false)}
          editMode={viewSale}
          variant="sales"
          mode="view"
        />
      )}

      
      {showModal && (
        <CrudTable
          closeWindow={() => setShowModal(false)}
          variant="sales"
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
