import React, { useState } from "react";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setSuccess("Login successful!");
      setEmail("");
      setPassword("");
      setError("");
    } else {
      setError(data.message || "Login failed");
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
      error={error}
      success={success}
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
        autocomplete="current-password"
      />
    </AuthForm>
  );
}

export default Login;
