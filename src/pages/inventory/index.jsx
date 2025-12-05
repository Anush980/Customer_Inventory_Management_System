import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import StatsCard from "../../components/ui/StatsCard/StatsCard";
import CrudTable from "../../components/ui/CrudTable/CrudTable";
import "./inventory.css";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import InventoryTable from "../../components/inventory/InventoryTable";

import { useInventory } from "../../hooks/useInventory";
import {
  statusOptions,
  categoryOptions,
} from "../../data/filterConfig/inventoryFilterConfigs";
import InventoryStatsCard from "../../components/inventory/InventoryStatsCard/InventoryStatsCard";
import InventoryStats from "../../components/inventory/InventoryStats/InventoryStats";

const InventoryPage = () => {
  const [editItem, setEditItem] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteItem, setDeleteItem] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [searchText, setSearchText] = useState("");

  const { items, loading, deleteItemById, } =
    useInventory({
      search: searchText,
      category,
      stock: status,
      sort: "newest",
    });

  const handleEdit = (row) => {
    setEditItem(row);
    setShowModal(true);
  };

  const handleDelete = (row) => {
    setDeleteItem(row);
    setShowConfirm(true);
  };

  //confirm delete
  const confirmDelete = async () => {
    if (!deleteItem) return;
    try {
      await deleteItemById(deleteItem._id);
      setSnackbar({ message: "Deleted successfully", type: "success" });
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
        <InventoryStatsCard variant="total" />
        <InventoryStatsCard variant="low" />
        <InventoryStatsCard variant="out" />
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

     <div className="inventory-content">
  <div className="inventory-left">
    <InventoryTable
      data={items}
      loading={loading}
      editable={true}
      editMode={handleEdit}
      onDelete={handleDelete}
    />
  </div>

  <div className="inventory-right">
    <InventoryStats variant="low" limit={5} />
    <InventoryStats variant="out" limit={5} />
  </div>
</div>


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
