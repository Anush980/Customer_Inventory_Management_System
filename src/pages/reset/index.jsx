import React from 'react'
import { useState } from 'react';
import AuthForm from '../../components/auth/AuthForm'
import AuthInput from '../../components/auth/authInput'

function Reset() {
   const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Login with:",  password);
      // API call
    };
  return (
    <AuthForm type="reset" onSubmit={handleSubmit}>
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

export default Reset