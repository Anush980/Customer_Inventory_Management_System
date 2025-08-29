import React from "react";
import "./authform.css";
import authConfigs from "./authConfigs";
import AuthHeader from "./authHeader";
import RememberForgot from "./rememberForgot";
import Divider from "./divider";
import SocialLogin from "./socialLogin";
import AuthFooter from "./authFooter";
import Button from "../ui/button";
import Agreement from "./agreement";

const AuthForm = ({ type, onSubmit, children }) => {
  const config = authConfigs[type];
  if (!config) return <p>Unknown type.</p>;

  return (
    <div className="auth-container">
      <AuthHeader title={config.title} subtitle={config.subTitle} />

      <div className="auth-body">
        <form onSubmit={onSubmit}>
         
          {children}

          {type === "login" && <RememberForgot />}
          {type === "register" && <Agreement />}

          <Button label={config.buttonText} />
        </form>

        {(type === "login" || type === "register") && (
          <Divider label={config.dividerText} />
        )}

        {(type === "login" || type === "register") && <SocialLogin />}
      </div>

      <AuthFooter
        footerText={config.footerText}
        destination={config.switchLink.to}
        text={config.switchLink.text}
      />
    </div>
  );
};

export default AuthForm;
