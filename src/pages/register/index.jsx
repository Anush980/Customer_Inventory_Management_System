import React from 'react'
import { useState } from 'react';
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from '../../components/auth/Input/authInput'

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

   const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
       setError("Passwords do not match!");
      return;
    }
    
    // API call
  };
  return (
   <AuthForm type="register" onSubmit={handleSubmit} error={error}>
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
        autocomplete="new-password"
       
      />
      <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
         value={confirmPassword}
        onchange={(e) => setConfirmPassword(e.target.value)}
        
      />
       
    </AuthForm>
  )
}

export default Register;