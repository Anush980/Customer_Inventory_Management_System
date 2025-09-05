import React, { useEffect, useState } from "react";
import "./customerCard.css";
import logo from "../../../assets/CIMS_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/ui/Button/Button";


const CustomerCard = () => {
const [customers,setCustomers]=useState([]);
const [loading,setLoading]=useState(true);


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

if(loading) return <p>Loading...</p>
  return (
    <>
    {customers.map((customer)=>(
<div className="customer-card" key={customer._Id}>
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
        <Button variant="primary">Edit</Button>
        <Button variant="danger">Delete</Button>
      </div>
    </div>
    ))}
    </>
  );

};

export default CustomerCard;
