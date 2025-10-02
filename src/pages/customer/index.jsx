import React, { useEffect, useState } from "react";
import Layout from "../../components/ui/Layout/Layout";
import StatsCard from "../../components/ui/StatsCard/StatsCard";
import Pageheader from "../../components/ui/PageHeader/Pageheader";
import { sortOptions } from "../../data/filterConfig/customerFilterConfigs";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import CustomerCard from "../../components/customer/CustomerCard/CustomerCard";
import CustomerForm from "../../components/customer/CustomerForm/CustomerForm";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import "./customer.css";
import { faSlack } from "@fortawesome/free-brands-svg-icons";
import { getCustomers, deleteCustomer } from "../../api/customerApi";

const CustomerPage = () => {
  const [sort, setSort] = useState("latest");
  const [searchText, setSearchText] = useState("");

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    fetchCustomers();
  }, [searchText, sort]);
  const fetchCustomers = async () => {
    setLoading(true);
    try {
      const data = await getCustomers({
        search: searchText,
        sort,
      });
      setCustomers(data);
    } catch (err) {
      console.error("Error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (id) => {
    setDeleteID(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!deleteID) return;
    try {
      await deleteCustomer(deleteID);
      setCustomers((prev) => prev.filter((c) => c._id !== deleteID));
    } catch (err) {
      console.err("Error:", err);
    } finally {
      setShowConfirm(false);
    }
  };

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  return (
    <Layout>
      <Pageheader
        title="Customer Management"
        btnTitle="Add"
        variant="customer"
      />
      <StatsCard value="9" change="1" type="customer" />
      <FilterBar
        filters={[{ value: sort, onChange: setSort, options: sortOptions }]}
        search={{
          value: searchText,
          onChange: setSearchText,
          placeholder: "Search customers...",
        }}
      />
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
        />
      )}
    </Layout>
  );
};

export default CustomerPage;
