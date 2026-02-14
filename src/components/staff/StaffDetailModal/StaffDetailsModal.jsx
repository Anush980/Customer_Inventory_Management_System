import React, { useState } from "react";
import "./staffDetailsModal.css";
import Button from "../../ui/Button/Button";

const StaffDetailsModal = ({ staff, onClose, changeStaffPassword, onResendEmail }) => {
  // Hooks must always be called first
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  // Password update
  const handlePasswordUpdate = async () => {
    if (!newPassword) return alert("Enter a password!");
    try {
      setLoading(true);
      await changeStaffPassword(staff._id, newPassword);
      alert("Password updated successfully");
      setNewPassword("");
    } catch (err) {
      alert("Failed to update password: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  // Resend email
  const handleResendEmail = async () => {
    try {
      setLoading(true);
      await onResendEmail(staff._id);
      alert("Login credentials resent to personal email");
    } catch (err) {
      alert("Failed to resend email");
    } finally {
      setLoading(false);
    }
  };

  // If no staff selected, render nothing
  if (!staff) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <div className="modal-header">
          <h3>Staff Details</h3>
        </div>
        <div className="modal-body">
          <p><strong>Name:</strong> {staff.name}</p>
          <p><strong>Login Email:</strong> {staff.email}</p>
          <p><strong>Personal Email:</strong> {staff.staffEmail}</p>

          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="form-control"
            />
          </div>

          <div className="modal-actions">
            <Button variant="text" onClick={onClose}>Close</Button>
            <Button variant="primary" onClick={handlePasswordUpdate} isLoading={loading}>
              Update Password
            </Button>
            {/* <Button variant="secondary" onClick={handleResendEmail} isLoading={loading}>
              Resend Email
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffDetailsModal;
