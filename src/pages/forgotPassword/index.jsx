import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";

function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      setError("Email is required!");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reset/send-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Backend says OTP sent successfully
        sessionStorage.setItem("forgotEmail", email); // store email for OTP page
        setSuccess("OTP sent! Redirecting to verification...");
        setTimeout(() => navigate("/verify-otp", { state: { email } }), 1000);
      } else {
        // Backend returned an error (like email not found)
        setError(data.message || "Account not found");
        setSuccess("");
      }
    } catch (err) {
      setError("Server error!");
      setSuccess("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      type="forgotPassword"
      onSubmit={handleSubmit}
      error={error}
      success={success}
      loading={loading}
    >
      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </AuthForm>
  );
}

export default ForgotPassword;
