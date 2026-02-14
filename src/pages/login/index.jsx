import React, { useState } from "react";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";
import { useNavigate } from "react-router-dom";
import RememberForgot from "../../components/auth/RememberForget/RememberForgot";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fadeError, setFadeError] = useState(false);
  const [fadeSuccess, setFadeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    setFadeError(false);
    setFadeSuccess(false);

    try {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await res.json();

      // console.log('Login response:', data);
      // console.log('Token received:', data.token);

if (res.ok) {
  // Clear both storages first to avoid conflicts
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  
  // Then store in the correct location
  const storage = remember ? localStorage : sessionStorage;
  storage.setItem("token", data.token);
  storage.setItem("user", JSON.stringify(data.user));
  
  console.log("Token stored in:", remember ? "localStorage" : "sessionStorage");
  console.log("Token value:", storage.getItem("token"));
  
  setSuccess("Login successful!");
  setEmail("");
  setPassword("");
  setTimeout(() => setFadeSuccess(true), 3000);
  setTimeout(() => {
    if (data.user.role === "admin") {
  navigate("/user", { replace: true });
} else {
  navigate("/dashboard", { replace: true });
}

  }, 100);

      } else {
        setError(data.message || "Login failed");
        setTimeout(() => setFadeError(true), 3000);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
      error={error}
      success={success}
      fadeError={fadeError}
      fadeSuccess={fadeSuccess}
      loading={loading}
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
      <RememberForgot remember={remember} setRemember={setRemember} />
    </AuthForm>
  );
}

export default Login;
