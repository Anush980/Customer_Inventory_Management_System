import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";

function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get token from location.state or sessionStorage
  const initialToken = location.state?.resetToken || sessionStorage.getItem("resetToken");
  const [resetToken, setResetToken] = useState(initialToken);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Protect page
  useEffect(() => {
    if (!resetToken) navigate("/forgot-password", { replace: true });
  }, [resetToken, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reset/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        sessionStorage.removeItem("resetToken");
        sessionStorage.removeItem("forgotEmail");
        setSuccess("Password reset successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Failed to reset password");
      }
    } catch (err) {
      setError("Server error!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm type="resetPassword" onSubmit={handleSubmit} error={error} success={success} loading={loading}>
      <AuthInput
        label="New Password"
        type="password"
        placeholder="Enter your new password"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your new password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </AuthForm>
  );
}

export default ResetPassword;
