import React from 'react'
import { useState } from 'react';
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from '../../components/auth/Input/authInput';

function Reset() {
   const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
      const [error, setError] = useState("");
  
    const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
       setError("Passwords do not match!");
      return;
    }
  }

  return (
    <AuthForm type="reset" onSubmit={handleSubmit} error={error}>
    <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </AuthForm>
    
  )
}

export default Reset;