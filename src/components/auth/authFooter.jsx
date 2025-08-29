import React from 'react';
import "./authFooter.css";
import { Link } from "react-router-dom";

function AuthFooter({ footerText, destination, text }) {
  return (
    <div className="auth-footer">
      <span>{footerText} </span>
      <Link to={destination}>{text}</Link>
    </div>
  );
}

export default AuthFooter;
