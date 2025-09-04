import React, { useState } from "react";
import Button from "../Button/Button";
import "./confirmCard.css";

const ConfirmCard = ({closeWindow,onConfirm}) => {
  const [loading,setLoading]=useState(false);

  return (
    <div className="confirm-card-wrapper">
      <div className="confirm-card-content">
        <div className="confirm-card-header">
          <h4>Delete Confirmation</h4>{" "}
        </div>
        <div className="confirm-card-text">
          <span>Are you sure you want to delete this item?</span>
        </div>

        <div className="btn-wrapper">
          <Button variant="text" onClick={closeWindow}>
            Cancel
          </Button>
          <Button variant="danger" onClick={onConfirm} isLoading={loading}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCard;
