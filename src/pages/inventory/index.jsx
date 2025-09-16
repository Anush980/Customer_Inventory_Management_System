import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import Table from "../../components/ui/table/table";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import StatsCard from "../../components/ui/StatsCard/StatsCard";
import CrudTable from "../../components/ui/CrudTable/CrudTable";
import "./inventory.css";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import InventoryTable from "../../components/inventory/InventoryTable";
import { statusOptions,categoryOptions } from "../../data/filterConfig/inventoryFilterConfigs";

const InventoryPage = () => {
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const [status, setStatus] = useState("");      
const [category, setCategory] = useState("");  
const [searchText, setSearchText] = useState(""); 


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
     <FilterBar
        filters={[
          { value: category, onChange: setCategory, options: categoryOptions },
          { value: status, onChange: setStatus, options: statusOptions },
        ]}
        search={{
          value: searchText,
          onChange: setSearchText,
          placeholder: "Search inventory...",
        }}
      />

      
      <InventoryTable editable={true}
        editMode={handleEdit}
        onDelete={handleDelete} />

      {showModal && (
        <CrudTable
          closeWindow={() => setShowModal(false)}
          editMode={editItem}
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
