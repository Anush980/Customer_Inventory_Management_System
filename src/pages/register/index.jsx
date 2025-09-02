import React from "react";
import { useState } from "react";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
    const navigate = useNavigate();
  const [success, setSuccess] = useState("");
    const [fadeError, setFadeError] = useState(false);
    const [fadeSuccess, setFadeSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }
    setError("");

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Signup successful!");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setError("");
      setTimeout(() => setFadeSuccess(true), 5000);
      navigate("/dashboard")
      
    } else {
      setError(data.message || "Signup failed");
       setTimeout(() => setFadeError(true), 5000);
      setFadeError(false);
    }
  };
  return (
    <AuthForm
      type="register"
      onSubmit={handleSubmit}
      error={error}
      success={success}
      fadeError={fadeError}
  fadeSuccess={fadeSuccess}
    >
      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autocomplete="email"
      />
      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autocomplete="new-password"
      />
      <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </AuthForm>
  );
};

export default Register;
