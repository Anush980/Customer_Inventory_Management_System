import React from 'react';
import './agreement.css';

const Agreement = () => {
  return (
    <div className="agreement">
      <input type="checkbox" id="agreement" required />
      <label htmlFor="agreement">
        I agree to the{" "}
        <a href="/register" target="_parent" >
           Terms of Service
        </a>{" "}
        and{" "}
        <a href="/register" target="_parent">
          Privacy Policy
        </a>
      </label>
    </div>
  );
}

export default Agreement;
