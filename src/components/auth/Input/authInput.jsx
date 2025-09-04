import React from "react";
import "./authInput.css";
function AuthInput({
  label,
  type,
  placeholder,
  autocomplete,
  value,
  onChange,
}) {
  return (
    <div className="input-wrapper">
    <div className="input">
      <label htmlFor={type}>{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="form-control"
        autoComplete={autocomplete}
        required
      />
    </div>
    </div>
  );
}

export default AuthInput;
