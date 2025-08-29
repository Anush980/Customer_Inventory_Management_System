import React from 'react'
import "./rememberForgot.css";

function RememberForgot() {
  return (
    <div className="remember-forgot">
    <div className="remember-me">
        <input type='checkbox' id="remember"/>
        <label for="remember">Remember me</label>
    </div>
    <a href="/src/college/ForgotPassword.jsx" className="forgot-password">Forgot password?</a>
</div>
  )
}

export default RememberForgot;