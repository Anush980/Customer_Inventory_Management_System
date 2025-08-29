import React from 'react'
import "./authHeader.css";
import WebLogo from "../../../assets/CIMS_logo.png";

function AuthHeader({title,subtitle}) {
  return (
   <div className="auth-header">
        <div className="auth-logo">
            <img src={WebLogo} alt="Logo"/>
        </div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
    </div>
  )
}

export default AuthHeader;