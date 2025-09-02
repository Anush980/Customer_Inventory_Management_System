import { Navigate } from "react-router-dom";

import useState from 'react'

const ProtectedRoute = ({children}) => {
    const [message, setMessage] = useState("");
    const token =localStorage.getItem("token");

    if(!token){
        setMessage("Please login first");
        return <Navigate to="/login"/>
    }
  return children;
};

export default ProtectedRoute