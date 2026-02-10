import { React, useState } from "react";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [shopName, setShopName] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fadeError, setFadeError] = useState(false);
  const [fadeSuccess, setFadeSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setFadeError(false);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setFadeError(false);
    setFadeSuccess(false);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, { // ← Fixed: parentheses not backticks
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, shopName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Don't store token - user needs to login
        // If you want auto-login, clear other storage first:
         localStorage.clear();
         sessionStorage.clear();
         localStorage.setItem("token", data.token);
         localStorage.setItem("user", JSON.stringify(data.user));
        
        setSuccess("Signup successful! Please login");
        setName("");
        setShopName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setFadeSuccess(false);
        setTimeout(() => setFadeSuccess(true), 3000);
        setTimeout(() => navigate("/login"), 1500);
      } else {
        setError(data.message || "Signup failed");
        setFadeError(false);
        setTimeout(() => setFadeError(true), 3000);
      }
    } catch (err) {
      setError("Something went wrong!");
    } finally {
      setLoading(false);
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
      loading={loading}
    >
      <AuthInput
        label="Full Name"
        type="text"
        placeholder="Enter your full name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <AuthInput
        label="Shop Name"
        type="text"
        placeholder="Enter your shop name"
        value={shopName}
        onChange={(e) => setShopName(e.target.value)}
      />
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
        autocomplete="new-password"
      />
    </AuthForm>
  );
};

export default Register;