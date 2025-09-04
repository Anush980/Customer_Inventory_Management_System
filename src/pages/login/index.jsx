import { React,useState } from "react";
import AuthForm from "../../components/auth/Form/AuthForm";
import AuthInput from "../../components/auth/Input/authInput";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
    const [fadeError, setFadeError] = useState(false);
  const [fadeSuccess, setFadeSuccess] = useState(false);
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    try{
    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("token",data.token);
      setSuccess("Login successful!");
      setFadeSuccess(false);
      setEmail("");
      setPassword("");
      setError("");
       setTimeout(() => setFadeSuccess(true), 5000);
      navigate("/dashboard")
      
    } else {
      setError(data.message || "Login failed");
      setTimeout(() => setFadeError(true), 5000);
      setFadeError(false);
      
    }
  }
  catch (err) {
      setError("Something went wrong. Please try again.");
  }
    finally{
      setLoading(false);
    }
  };

  return (
    <AuthForm
      type="login"
      onSubmit={handleSubmit}
      error={error}
      success={success}
      fadeError={fadeError}
  fadeSuccess={fadeSuccess}
  loading={loading}
    >
      <AuthInput
        label="Email"
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autocomplete="email"
      />
      <AuthInput
        label="Password"
        type="password"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autocomplete="current-password"
      />
    </AuthForm>
  );
}

export default Login;
