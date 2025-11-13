import React, {useState } from "react";
import Layout from "../../components/ui/Layout/Layout";

import Pageheader from "../../components/ui/PageHeader/Pageheader";
import FilterBar from "../../components/ui/Filterbar/FilterBar";
import CustomerCard from "../../components/customer/CustomerCard/CustomerCard";
import CustomerForm from "../../components/customer/CustomerForm/CustomerForm";
import ConfirmCard from "../../components/ui/ConfirmCard/ConfirmCard";
import CustomerStats from "../../components/customer/customerStats/CustomerStats";
import { sortOptions } from "../../data/filterConfig/customerFilterConfigs";
import { useCustomers } from "../../hooks/useCustomer";
import "./customer.css";

const CustomerPage = () => {
  const [sort, setSort] = useState("latest");
  const [searchText, setSearchText] = useState("");

  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const {customers,loading,error,deleteCustomerById,saveCustomerById}=useCustomers({search:searchText,sort});

  const handleDelete = (id) => {
    setDeleteID(id);
    setShowConfirm(true);
  };

const confirmDelete=()=>{
  if(!deleteID) return;
  deleteCustomerById(deleteID);
  setShowConfirm(false);
}

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowForm(true);
  };

  const handleFormSubmit = async (customer)=>{
    try{
      await saveCustomerById(customer);//handles create or update
      setShowConfirm(false);
    }
    catch(err){
      console.error("Failed to save customer.",err);
    }
  }


  return (
    <Layout>
      <Pageheader
        title="Customer Management"
        btnTitle="Add"
        variant="customer"
      />
    <CustomerStats/>
      <FilterBar
        filters={[{ value: sort, onChange: setSort, options: sortOptions }]}
        search={{
          value: searchText,
          onChange: setSearchText,
          placeholder: "Search customers...",
        }}
      />
       {loading && <div>Loading...</div>}
      {error && <div className="error">{error}</div>}

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
          onSubmit = {handleFormSubmit}
        />
      )}
    </Layout>
  );
};

export default CustomerPage;
