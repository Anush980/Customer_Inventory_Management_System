import React from 'react'
import "./authInput.css";
function AuthInput({label,type,placeholder}) {
  return (
   <div className="input">
    <label for={type}>{label}</label>
    <input type={type} placeholder={placeholder} className='form-control' required/>
</div>
  )
}

export default AuthInput;