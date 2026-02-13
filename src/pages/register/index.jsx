import { React, useState } from "react";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from '../../components/auth/Input/authInput';
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

  // Password validation function
  const validatePassword = (password) => {
    const errors = [];

    if (password.length < 8) errors.push("At least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("1 uppercase letter required");
    if (!/[a-z]/.test(password)) errors.push("1 lowercase letter required");
    if (!/[0-9]/.test(password)) errors.push("1 number required");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("1 special character required");
    if (/\s/.test(password)) errors.push("Password cannot contain spaces");
    if (password === email) errors.push("Password cannot be the same as your email");

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setFadeError(false);
      return;
    }

    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      setError(passwordErrors.join(", "));
      setFadeError(false);
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");
    setFadeError(false);
    setFadeSuccess(false);

    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, shopName, email, password }),
      });

      const data = await res.json();

      if (res.ok) {
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
        onCopy={(e) => e.preventDefault()} 
      />
      <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        autocomplete="new-password"
        onPaste={(e) => e.preventDefault()} 
      />
    </AuthForm>
  );
};

export default Register;
