import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./userCard.css";

const roleLabels = {
  admin: "Admin",
  owner: "Shop Owner",
  manager: "Manager",
  staff: "Staff",
};

const statusLabels = {
  active: "Active",
  suspended: "Suspended",
  pending: "Pending",
};

const UserCard = ({ user, onView, onEdit, onToggleBlock, onDelete }) => {
  const roleClass = `role-${user.role}`;
  const statusClass = `status-${user.isBlocked ? "blocked" : "active"}`;

  const isAdmin = user.role === "admin";

  return (
    <div className="user-card">
      {/* ---------- HEADER ---------- */}
      <div className="user-card-header">
        <img src={user.image} alt={user.name} className="user-avatar" />
        <div className="user-info-card">
          <div className="user-name">{user.name}</div>
          <div className="user-email">{user.email}</div>
          <div className={`user-role ${roleClass}`}>
            {roleLabels[user.role]}
          </div>
        </div>
      </div>

      {/* ---------- BODY ---------- */}
      <div className="user-card-body">
        <div className="user-details">
          <div className="detail-row">
            <div className="detail-label">Phone:</div>
            <div className="detail-value">
              {user.staffPhone || user.phone || "N/A"}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Email:</div>
            <div className="detail-value">
              {user.staffEmail || user.email || "N/A"}
            </div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Store:</div>
            <div className="detail-value">{user.shopName || "N/A"}</div>
          </div>

          <div className="detail-row">
            <div className="detail-label">Joined:</div>
            <div className="detail-value">
              {user.createdAt?.split("T")[0] || "N/A"}
            </div>
          </div>
        </div>

        <div className={`user-status ${statusClass}`}>
          {user.isBlocked ? "Blocked" : statusLabels[user.status] || "Active"}
        </div>
      </div>

      {/* ---------- FOOTER ---------- */}
      <div className="user-card-footer">
        {/* View */}
        {/* <div className="action-btn view" onClick={() => onView(user)}>
          <FontAwesomeIcon icon="eye" className="icon" />
        </div> */}

        {/* Edit */}
        <div className="action-btn edit" onClick={() => onEdit(user)}>
          <FontAwesomeIcon icon="edit" className="icon" />
        </div>

        {/* Block / Unblock */}
        <div
          className={`action-btn block ${
            isAdmin ? "disabled" : user.isBlocked ? "unblock" : "block"
          }`}
          title={isAdmin ? "Admin cannot be blocked" : ""}
          onClick={() => {
            if (!isAdmin) onToggleBlock(user);
          }}
        >
          {user.isBlocked ? (
            <FontAwesomeIcon icon="user-check" className="icon" />
          ) : (
            <FontAwesomeIcon icon="user-slash" className="icon" />
          )}
        </div>

        {/* Delete */}
        <div
          className={`action-btn delete ${isAdmin ? "disabled" : ""}`}
          title={isAdmin ? "Admin cannot be deleted" : ""}
          onClick={() => {
            if (!isAdmin) onDelete(user._id);
          }}
        >
          <FontAwesomeIcon icon="trash-can" className="icon" />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
