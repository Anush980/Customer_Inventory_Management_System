import React from 'react'
import "./rememberForgot.css";
import { Link } from "react-router-dom";

function RememberForgot() {
  return (
    <div className="remember-forgot">
    <div className="remember-me">
        <input type='checkbox' id="remember"/>
        <label htmlFor="remember">Remember me</label>
    </div>
    <Link className="forgot-password" to="/reset">Forgot password?</Link>
</div>
  )
}

export default RememberForgot;