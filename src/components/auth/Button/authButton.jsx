import React from 'react'
import './authButton.css';

const AuthButton = ({label, type}) => {
  return (
    <button type="submit" className="btn">
              {label}
            </button>
  )
}

export default AuthButton;