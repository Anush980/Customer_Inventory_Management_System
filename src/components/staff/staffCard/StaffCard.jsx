import React from "react";
import "./staffCard.css";
import Button from "../../ui/Button/Button";
import logo from "../../../assets/CIMS_logo.png";

const StaffCard = ({ staff, onEdit, onDelete, onShowDetails }) => {
  return (
    <div className="staff-card">
      <div className="staff-card-avatar">
        <img src={staff.image || logo} alt={staff.name} />
      </div>

      <div className="staff-card-info">
        <h3>{staff.name}</h3>
        <p className="role">{staff.jobTitle || "Staff"}</p>
      </div>

      <div className="staff-card-details">
        <p>Email: {staff.email}</p>
        <p>Phone: {staff.staffPhone || "N/A"}</p>
        <p>Address: {staff.staffAddress || "N/A"}</p>
        <p>Salary: {staff.salary || 0}</p>
      </div>

      <div className="staff-card-actions">
        <Button variant="primary" onClick={() => onEdit(staff)}>Edit</Button>
        <Button variant="danger" onClick={() => onDelete(staff._id)}>Delete</Button>
        <Button variant="text" onClick={() => onShowDetails(staff)}>Show Details</Button>
      </div>
    </div>
  );
};

export default StaffCard;
