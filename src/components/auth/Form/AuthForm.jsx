import React from "react";
import "./authform.css";
import authConfigs from "../authConfigs";
import AuthHeader from "../Header/authHeader";
import RememberForgot from "../RememberForget/rememberForgot";
import Divider from "../Divider/divider";
import SocialLogin from "../SocialLogin/socialLogin";
import AuthFooter from "../Footer/authFooter";
import Button from "../Button/authButton";
import Agreement from "../Agreement/agreement";

const AuthForm = ({ type, onSubmit, children ,error}) => {
  const config = authConfigs[type];
  if (!config) return <p>Unknown type.</p>;

  return (
    <div className="auth-container">
      <AuthHeader title={config.title} subtitle={config.subTitle} />

      <div className="auth-body">
        <form onSubmit={onSubmit}>
         
          {children}
{error && <p className="error-text">{error}</p>}
          {type === "login" && <RememberForgot />}
          {type === "register" && <Agreement />}

          <Button label={config.buttonText}  />
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
