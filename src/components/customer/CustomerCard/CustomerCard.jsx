import React, { useEffect, useState } from "react";
import "./customerCard.css";
import logo from "../../../assets/CIMS_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/ui/Button/Button";
import ConfirmCard from "../../ui/ConfirmCard/ConfirmCard";


const CustomerCard = ({onEdit}) => {
const [customers,setCustomers]=useState([]);
const [loading,setLoading]=useState(true);
const [showConfirm,setShowConfirm]= useState(false);
const [deleteCustomer,setDeleteCustomer]=useState(null);



useEffect(() => {
  fetch(`${process.env.REACT_APP_API_URL}/api/customer`)
  .then((res)=>res.json())
  .then((data)=>{
    setCustomers(data);
    setLoading(false);
  })
  .catch((err)=>{
    console.log("Error fetching data",err);
    setLoading(false)
  })
}, []);

 const handleDelete = (id) => {
 setDeleteCustomer(id); 
 setShowConfirm(true);

  };

  const confirmDelete = async ()=>{
if(!deleteCustomer) return;
try{
  const response = await fetch(`${process.env.REACT_APP_API_URL}/api/customer/${deleteCustomer}`, {
    method:"DELETE"
  });
  if(!response.ok){
    throw new Error("Delete failed.")
    

  }
  setCustomers((prev)=>prev.filter((c)=>c._id !==deleteCustomer));
  setShowConfirm(false);
}
catch(error){
  console.error("Error:",error)
  setShowConfirm(false);
}
  };
  

if(loading) return <p>Loading...</p>
 if (customers.length === 0) return <p>No customers found.</p>;

  return (
    <>
    {customers.map((customer)=>(
<div className="customer-card" key={customer._id}>
      <div className="customer-card-header">
        <img src={logo} alt="photo" />

        <div className="customer-card-info">
          <h3>{customer.customerName}</h3>
        </div>
      </div>
      <div className="customer-card-details">
        <p>
          <FontAwesomeIcon icon="envelope" className="icon" />
          {customer.customerEmail}
        </p>
        <p>
          <FontAwesomeIcon icon="phone" className="icon" />{customer.customerPhone}
        </p>
        <p>
          <FontAwesomeIcon icon="map-marker-alt" className="icon" />
          {customer.customerAddress}
        </p>
         <p className={customer.creditBalance >= 0 ? "positive" : "negative"}>
          <FontAwesomeIcon icon="money-bill" className="icon"/>
    Credit Balance: {customer.creditBalance}</p>
      </div>
      <div className="customer-card-actions">
        <Button variant="primary" onClick={() => onEdit(customer)} >Edit</Button>
        <Button variant="danger" onClick={() => handleDelete(customer._id)}>Delete</Button>
      </div>
    </div>
    ))}
     {showConfirm && (
        <ConfirmCard
          closeWindow={() => setShowConfirm(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );

};

export default CustomerCard;
