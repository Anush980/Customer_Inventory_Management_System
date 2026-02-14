import React, { useState } from "react";
import { createPortal } from "react-dom";
import Button from "../Button/Button";
import "./logoutCard.css";

const LogoutCard = ({ closeWindow, onConfirm }) => {
  const [loading, setLoading] = useState(false);

  return createPortal(
    <div className="confirm-card-wrapper">
      <div className="confirm-card-content">
        <div className="confirm-card-header">
          <h4>Log out Confirmation</h4>
        </div>
        <div className="confirm-card-text">
          <span>Are you sure you want to logout?</span>
        </div>

        <div className="btn-wrapper">
          <Button variant="text" onClick={closeWindow}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              setLoading(true);
              onConfirm();
            }}
            isLoading={loading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default LogoutCard;
