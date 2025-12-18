import React from "react";
import "./rememberForgot.css";
import { Link } from "react-router-dom";

function RememberForgot({ remember, setRemember }) {
  return (
    <div className="remember-forgot">
      <div className="remember-me">
        <input
          type="checkbox"
          id="remember"
          checked={remember}
          onChange={(e) => setRemember(e.target.checked)}
        />
        <label htmlFor="remember">Remember me</label>
      </div>
      <Link className="forgot-password" to="/reset">Forgot password?</Link>
    </div>
  );
}

export default RememberForgot;

