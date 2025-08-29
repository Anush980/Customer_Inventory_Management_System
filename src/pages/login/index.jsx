import React, { useState } from "react";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error ,setError]= useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
   setError("User not Found !");
    // API call
  };

  return (
    <AuthForm type="login" onSubmit={handleSubmit} error={error}>
      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onchange={(e) => setEmail(e.target.value)}
        autocomplete="email"
      />
      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onchange={(e) => setPassword(e.target.value)}
        autocomplete="current-password"
      />
    </AuthForm>
  );
}

export default Login;
