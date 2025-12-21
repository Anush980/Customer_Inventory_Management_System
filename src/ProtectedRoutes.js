import { Navigate } from "react-router-dom";

const ProtectedRoute = ({children}) => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  
  console.log('ProtectedRoute - token found:', !!token);
  
  if(!token){
    return <Navigate to="/login" replace />
  }
  
  return children;
};

export default ProtectedRoute;