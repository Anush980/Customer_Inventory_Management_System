import React from 'react'
import './button.css';

const Button = ({label, type}) => {
  return (
    <button type="submit" className="btn">
              {label}
            </button>
  )
}

export default Button