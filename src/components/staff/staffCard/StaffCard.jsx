import React, { useState } from "react";
import "./staffCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../ui/Button/Button";
import logo from "../../../assets/CIMS_logo.png"; // fallback avatar
import StaffDetailsModal from "../StaffDetailModal/StaffDetailsModal";

const StaffCard = ({ staff, onEdit, onDelete, onPasswordUpdate, onResendEmail }) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <>
      <div className="staff-card">
        {/* Avatar */}
        <div className="staff-card-avatar">
          <img src={staff.avatar || logo} alt={staff.name} />
        </div>

        {/* Name & Role */}
        <div className="staff-card-info">
          <h3>{staff.name}</h3>
          <p className="role">{staff.jobTitle || "Staff"}</p>
        </div>

        {/* Contact / Details */}
        <div className="staff-card-details">
          <p>
            <FontAwesomeIcon icon={["fas", "envelope"]} className="icon" />
            {staff.email}
          </p>
          <p>
            <FontAwesomeIcon icon={["fas", "phone"]} className="icon" />
            {staff.staffPhone || "N/A"}
          </p>
          <p>
            <FontAwesomeIcon icon={["fas", "map-marker-alt"]} className="icon" />
            {staff.staffAddress || "N/A"}
          </p>
          <p>
            <FontAwesomeIcon icon={["fas", "money-bill"]} className="icon" />
            Salary: {staff.salary || 0}
          </p>
        </div>

        {/* Actions */}
        <div className="staff-card-actions">
          <Button variant="primary" onClick={() => onEdit(staff)}>
            <FontAwesomeIcon icon={["fas", "edit"]} /> Edit
          </Button>
          <Button variant="danger" onClick={() => onDelete(staff._id)}>
            <FontAwesomeIcon icon={["fas", "trash"]} /> Delete
          </Button>
          <Button variant="text" onClick={() => setShowDetails(true)}>
            Show Details
          </Button>
        </div>
      </div>

      {/* Staff Details Modal */}
      {showDetails && (
        <StaffDetailsModal
          staff={staff}
          onClose={() => setShowDetails(false)}
          onPasswordUpdate={onPasswordUpdate} // handle manual password update
          onResendEmail={onResendEmail} // handle resend login credentials
        />
      )}
    </>
  );
};

export default StaffCard;
