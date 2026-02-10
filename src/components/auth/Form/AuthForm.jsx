import React from "react";
import "./authform.css";
import authConfigs from "../authConfigs";
import AuthHeader from "../Header/authHeader";
import Divider from "../Divider/divider";
import SocialLogin from "../SocialLogin/socialLogin";
import AuthFooter from "../Footer/authFooter";
import Button from "../../ui/Button/Button";
import Agreement from "../Agreement/agreement";

const AuthForm = ({ type, onSubmit, children ,error,success,fadeError,fadeSuccess,loading}) => {
  const config = authConfigs[type];
  if (!config) return <p>Unknown type.</p>;

  return (
    <div className="auth-wrapper">
    <div className="auth-container">
      <AuthHeader title={config.title} subtitle={config.subTitle} />

      <div className="auth-body">
        <form onSubmit={onSubmit}>
         
          {children}
            {error && <p className={`error-text ${fadeError ? "fade" : ""}`}>{error}</p>}
            {success && <p className={`success-text ${fadeSuccess ? "fade" : ""}`}>{success}</p>}
          
          {type === "register" && <Agreement />}

          <div className="button-wrapper"><Button variant="auth" isLoading={loading}>{config.buttonText} </Button></div>
        </form>

        {/* {(type === "login" || type === "register") && (
          <Divider label={config.dividerText} />
        )} */}

        {/* {(type === "login" || type === "register") && <SocialLogin />} */}
      </div>

      <AuthFooter
        footerText={config.footerText}
        destination={config.switchLink.to}
        text={config.switchLink.text}
      />
    </div>
    </div>
  );
};

export default AuthForm;
