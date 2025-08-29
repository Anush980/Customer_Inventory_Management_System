import React from "react";
import "./socialLogin.css";
import GoogleLogo from "../../assets/Google.png";
import FacebookLogo from "../../assets/Facebook.png";
import GithubLogo from "../../assets/Github.png";

function SocialLogin() {
  return (
    <div className="social-login">
      <a href="#" className="social-btn google">
        <img src={GoogleLogo} alt="Google" className="social-logo" />
      </a>
      <a href="#" className="social-btn facebook">
        <img src={FacebookLogo} alt="Facebook" className="social-logo" />
      </a>
      <a href="#" className="social-btn github">
        <img src={GithubLogo} alt="Github" className="social-logo" />
      </a>
    </div>
  );
}

export default SocialLogin;
