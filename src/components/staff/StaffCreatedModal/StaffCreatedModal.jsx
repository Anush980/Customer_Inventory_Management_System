import React, { useState } from "react";
import Button from "../../ui/Button/Button";
import "./staffCreatedModal.css";

const StaffCreatedModal = ({ staff, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleResend = async () => {
    try {
      setLoading(true);
      setSuccess("");

      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/staff/${staff._id}/resend-credentials`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to resend");

      setSuccess("Credentials resent successfully!");
    } catch (err) {
      alert("Failed to resend email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <h3>Staff Created Successfully 🎉</h3>

        <div className="info">
          <p><strong>Name:</strong> {staff.name}</p>
          <p><strong>Login Email:</strong> {staff.email}</p>
          <p><strong>Personal Email:</strong> {staff.staffEmail}</p>
        </div>

        <div className="note">
          Login credentials have been sent to the staff’s email.
        </div>

        {success && <div className="success">{success}</div>}

        <div className="actions">
          <Button
            variant="secondary"
            onClick={handleResend}
            isLoading={loading}
          >
            Resend Email
          </Button>

          <Button variant="primary" onClick={onClose}>
            Done
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StaffCreatedModal;
