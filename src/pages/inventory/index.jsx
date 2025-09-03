import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/dashboard/PageHeader/Pageheader";
import Table from "../../components/table/table";
import FilterBar from "../../components/dashboard/Filterbar/FilterBar";
import StatsCard from "../../components/dashboard/StatsCard/StatsCard";
import CrudTable from "../../components/ui/CrudTable/CrudTable";
import "./inventory.css";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import Snackbar from "../../components/ui/Snackbar/Snackbar";

const InventoryPage = () => {
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const handleEdit = (row) => {
    setEditItem(row);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setDeleteItem(row);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteItem) return;

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/inventory/${deleteItem._id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete");
      setSnackbar({ message: "Deleted successfully ", type: "success" });
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err) {
      console.error(err);
      setSnackbar({ message: "Deleted failed ", type: "error" });
    } finally {
      setShowConfirm(false);
      setDeleteItem(null);
    }
  };

  return (
    <Layout>
      <Pageheader
        title="Inventory Management"
        btnTitle="Add Item"
        variant="inventory"
      />

      <div className="stats-card">
        <StatsCard type="inventory" value="12" change="5" />
        <StatsCard type="allInventory" value="120" change="10" />
      </div>
      <FilterBar />
      <Table
        variant="inventory"
        editable={true}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {showModal && (
        <CrudTable
          closeWindow={() => setShowModal(false)}
          itemToEdit={editItem}
          variant="inventory"
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

export default InventoryPage;
