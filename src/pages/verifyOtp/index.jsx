import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AuthForm from "../../components/auth/Form/AuthForm";

function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || sessionStorage.getItem("forgotEmail");

  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [resendSuccess, setResendSuccess] = useState("");

  const inputRefs = useRef([]);

  // Ensure user comes from Forgot Password
  useEffect(() => {
    if (!email) {
      navigate("/login", { replace: true });
    }
  }, [email, navigate]);

  const handleChange = (value, index) => {
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) inputRefs.current[index + 1].focus();
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
    if (e.key === "Enter") handleSubmit(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const finalOtp = otp.join("");
    if (finalOtp.length !== 6) {
      setError("Please enter complete OTP");
      setSuccess("");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setResendSuccess("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reset/verify-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp: finalOtp }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        const { resetToken } = data;
        sessionStorage.setItem("resetToken", resetToken);
        setSuccess("OTP verified! Redirecting...");
        setTimeout(() => navigate("/reset-password", { state: { resetToken }, replace: true }), 1000);
      } else {
        setError(data.message || "Invalid OTP");
      }
    } catch (err) {
      setError("Server error!");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    setError("");
    setResendSuccess("");

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/reset/resend-otp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setResendSuccess(data.message || "OTP resent successfully");
        setOtp(["", "", "", "", "", ""]); // clear previous OTP input
        inputRefs.current[0].focus();
      } else {
        setError(data.message || "Failed to resend OTP");
      }
    } catch (err) {
      setError("Server error!");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <AuthForm type="verifyOtp" onSubmit={handleSubmit} error={error} success={success} loading={loading}>
      <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            ref={(el) => (inputRefs.current[index] = el)}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{ width: "40px", height: "40px", textAlign: "center", fontSize: "18px", marginBottom: "20px" }}
          />
        ))}
      </div>

      <div style={{ textAlign: "center", margin: "10px" }}>
  <span>Didn't receive your OTP? </span>
  <button
    type="button"
    onClick={handleResend}
    disabled={resendLoading}
    style={{
      background: "none",
      border: "none",
      color: "#007bff",       // typical link color
      // textDecoration: "underline",
      cursor: resendLoading ? "not-allowed" : "pointer",
      padding: 0,
      margin: 0,
      fontSize: "inherit",
      fontFamily: "inherit"
    }}
  >
    {resendLoading ? "Resending..." : "Resend OTP"}
  </button>
  {resendSuccess && <p className="success-text">{resendSuccess}</p>}
</div>

    </AuthForm>
  );
}

export default VerifyOtp;
