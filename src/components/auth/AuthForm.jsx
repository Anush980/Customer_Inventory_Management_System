import React from "react";
import "./authform.css";
import authConfigs from "./authConfigs";
import AuthHeader from "./authHeader";
import AuthInput from "./authInput";
import RememberForgot from "./remember";
import Divider from "./divider";
import SocialLogin from "./socialLogin";
import AuthFooter from "./authFooter";
import Button from "../ui/button";


const AuthForm = ({ type }) => {
  const config = authConfigs[type];

  if (!config) return <p>Unknown type.</p>;
  return (
    <div className="auth-container">
      <AuthHeader title={config.title} subtitle={config.subTitle} />
      <div className="auth-body">
        <form action="" method="post" id="login-form">
          {config.fields.map((field) => {
            return (
              <AuthInput
                label={field.label}
                type={field.type}
                placeholder={field.placeholder}
              />
            );
          })}
          {type === "login" && <RememberForgot />}
          <Button label={config.buttonText} />
        </form>
        {(type === "login" || type === "register") && <Divider label={config.dividerText} />}
        
       {(type === "login" || type === "register") && <SocialLogin />}
      </div>
      <AuthFooter footerText={config.footerText} destination={config.switchLink.to} text={config.switchLink.text} />
    </div>
  );
};

export default AuthForm;
