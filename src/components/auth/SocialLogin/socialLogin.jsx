import React from "react";
import "./socialLogin.css";
import GoogleLogo from "../../../assets/Google.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function SocialLogin() {
  const navigate = useNavigate();

  // 🔹 new function: calls google OAuth popup
  const startGoogleLogin = () => {
    /* global google */  // <-- stops ESLint warning
    
    const client = google.accounts.oauth2.initTokenClient({
      client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID, // your client ID
      scope: "profile email",
      callback: async (res) => {
        console.log("Google token:", res.access_token);

        // 🔹 now send this token to backend
        const response = await axios.post(
          `${process.env.REACT_APP_API_URL}/auth/google`,
          { token: res.access_token }
        );

        // 🔹 save JWT from backend
        localStorage.setItem("token", response.data.token);

        navigate("/dashboard");
      }
    });

    client.requestAccessToken(); 
  };

  return (
    <div className="social-login">

      {/* 🔥 CUSTOM GOOGLE BUTTON */}
      <button className="social-btn google" onClick={startGoogleLogin}>
        <img src={GoogleLogo} alt="Google" className="social-logo" />
      </button>

    </div>
  );
}

export default SocialLogin;
