import React from "react";
import "./customerCard.css";
import logo from "../../../assets/CIMS_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../components/ui/Button/Button";

const CustomerCard = ({ customer, onEdit, onDelete }) => {
  return (
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
          <FontAwesomeIcon icon="phone" className="icon" />
          {customer.customerPhone}
        </p>
        <p>
          <FontAwesomeIcon icon="map-marker-alt" className="icon" />
          {customer.customerAddress}
        </p>
        <p className={customer.creditBalance >= 0 ? "positive" : "negative"}>
          <FontAwesomeIcon icon="money-bill" className="icon" />
          Credit Balance: {customer.creditBalance}
        </p>
      </div>

      <div className="customer-card-actions">
        <Button variant="primary" onClick={() => onEdit(customer)}>
          Edit
        </Button>
        <Button variant="danger" onClick={() => onDelete(customer._id)}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default CustomerCard;
