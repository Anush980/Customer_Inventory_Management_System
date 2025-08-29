import React from 'react'
import AuthForm from '../../components/auth/AuthForm';
import AuthInput from '../../components/auth/authInput'

const Register = () => {
  return (
   <AuthForm type="register">
      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        
       
      />
      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
       
      />
      <AuthInput
        label="Confirm Password"
        type="password"
        placeholder="Confirm your password"
        
      />
      {/* {error && <p className="error-text">{error}</p>} */}
    </AuthForm>
  )
}

export default Register;