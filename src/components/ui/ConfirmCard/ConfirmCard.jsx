import React, { useState } from "react";
import "./confirmCard.css";

const ConfirmCard = ({closeWindow,onConfirm}) => {

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
          <button className="btn-outline" onClick={closeWindow}>
            <span>Cancel</span>
          </button>
          <button className="btn-danger" onClick={onConfirm}>
            <span>OK</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCard;
