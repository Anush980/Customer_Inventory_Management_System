import React, { useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import CustomerCard from "../../components/customer/CustomerCard/CustomerCard";
import CustomerForm from "../../components/customer/CustomerForm/CustomerForm";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import CustomerStats from "../../components/customer/customerStats/CustomerStats";
import Snackbar from "../../components/ui/Snackbar/Snackbar";
import { sortOptions } from "../../data/filterConfig/customerFilterConfigs";
import { useCustomers } from "../../hooks/useCustomer";
import "./customer.css";

const CustomerPage = () => {
  const [sort, setSort] = useState("recent");
  const [searchText, setSearchText] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [snackbar, setSnackbar] = useState(null);

  const { customers, loading, error, deleteCustomerById, saveCustomerById } = useCustomers({
    search: searchText,
    sort,
  });

  // --- DELETE HANDLER ---
  const handleDelete = (id) => {
    setDeleteID(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteID) return;

    try {
      const res = await deleteCustomerById(deleteID); // res = { message, type }
      setSnackbar({ message: res.message, type: res.type });
    } catch (err) {
      setSnackbar({ message: err.message, type: err.type || "error" });
    } finally {
      setShowConfirm(false);
      setDeleteID(null);
    }
  };

  // --- EDIT HANDLER ---
  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  // --- FORM SUBMIT HANDLER ---
  const handleFormSubmit = async (customer) => {
    try {
      const res = await saveCustomerById(customer); // res = { message, type }
      setSnackbar({ message: res.message, type: res.type });
      setShowForm(false);
      setSelectedCustomer(null);
    } catch (err) {
      setSnackbar({ message: err.message, type: err.type || "error" });
    }
  };

  return (
    <Layout>
      <Pageheader
        title="Customer Management"
        btnTitle="Add"
        variant="customer"
      />
      <CustomerStats />

      <FilterBar
        filters={[{ value: sort, onChange: setSort, options: sortOptions }]}
        search={{
          value: searchText,
          onChange: setSearchText,
          placeholder: "Search customers...",
        }}
      />

      {loading && <div>Loading...</div>}
      {!loading && !error && customers.length === 0 && (
        <div className="no-customers">No customers found</div>
      )}
      {/* {error && <div className="error">{error}</div>} */}

      <div className="customer-card-grid">
        {customers.map((c) => (
          <CustomerCard
            key={c._id}
            customer={c}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>

      {showConfirm && (
        <ConfirmCard
          closeWindow={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}

      {showForm && (
        <CustomerForm
          editMode={selectedCustomer}
          closeWindow={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
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

export default CustomerPage;
