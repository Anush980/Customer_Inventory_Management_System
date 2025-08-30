import React from 'react'
import './authButton.css';

const AuthButton = ({label, type}) => {
  return (
    <button type="submit" className="auth-btn">
              {label}
            </button>
  )
}

export default AuthButton;