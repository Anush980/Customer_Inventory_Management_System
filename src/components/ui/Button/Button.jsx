import React from "react";
import "./Button.css";

const Button = ({ variant = "primary", children, isLoading, disabled, ...props }) => {
  return (
    <button
      className={`btn btn-${variant} ${isLoading ? "loading" : ""}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <span className="spinner"></span>}
      <span className="label">{isLoading ? "Wait" : children}</span>
    </button>
  );
};

export default Button;
