import React from "react";
import "./customerCard.css";
import logo from "../../../assets/CIMS_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/ui/Button/Button";

const CustomerCard = () => {
  return (
    <div className="customer-card">
      <div className="customer-card-header">
        <img src={logo} alt="photo" />
       
        <div className="customer-card-info">
          <h3>Anush Shrestha</h3>
          <p>C1001</p>
        </div>
         </div>
        <div className="customer-card-details">
          <p><FontAwesomeIcon icon="faEnvelope" className="icon"/> anush.stha232@gmail.com</p>
          <p><FontAwesomeIcon icon="faPhone" className="icon"/>+977 9826999469</p>
          <p><FontAwesomeIcon icon="faMapMarker" className="icon"/> Damak-7,Nepal</p>
        </div>
        <div className="customer-card-actions">
          <Button variant="primary">Edit</Button>
          <Button variant="primary">Delete</Button>
        </div>
      
    </div>
  );
};

export default CustomerCard;
