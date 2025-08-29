import React from 'react'
import "./socialLogin.css";

function SocialLogin() {
  return (
   <div className="social-login">
            <a href='#' className='social-btn google'>
            <i className="fab fa-google"/></a>
            <a href='#' className='social-btn facebook'>
            <i className="fab fa-facebook"/></a>
            <a href='#' className='social-btn github'>
            <i className="fab fa-github"/></a>
        </div>
  )
}

export default SocialLogin