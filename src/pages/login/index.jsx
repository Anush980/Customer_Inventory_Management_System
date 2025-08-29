import React, { useState } from "react";
import AuthForm from "../../components/auth/AuthForm";
import AuthInput from "../../components/auth/authInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login with:", email, password);
    // API call
  };

  return (
    <AuthForm type="login" onSubmit={handleSubmit}>
      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
    </AuthForm>
  );
}

export default Login;
