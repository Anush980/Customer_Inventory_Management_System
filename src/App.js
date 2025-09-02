/* eslint-disable no-unused-vars */
import './App.css';
import Dashboard from './pages/dashboard';
import Login from './pages/login';
import Register from './pages/register';
import Reset from './pages/reset';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/ui/icon";
import Inventory from './pages/inventory';
import ProtectedRoute from './ProtectedRoutes';


function App() {
  
  return (
   
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        {/* Default page */}
        <Route path="*" element={<Login/>} />
{/*protected routes for testing*/}
<Route path="/dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>}/>
        

{/*Unprotected routes for testing*/}
        {/* Dashboard */}
         {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        {/*Inventory page*/}
        <Route path="/inventory" element={<Inventory/>}/>


      </Routes>
  );
}

export default App;
