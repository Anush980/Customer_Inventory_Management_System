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
import CustomerPage from './pages/customer';
import SalesBookPage from './pages/salesbook';
import SettingPage from './pages/setting';
import ProfilePage from './pages/profile';


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
<Route path="/inventory" element={<ProtectedRoute><Inventory/></ProtectedRoute>}/>
<Route path="/customer" element={<ProtectedRoute><CustomerPage/></ProtectedRoute>}/>
<Route path="/sales" element={<ProtectedRoute><SalesBookPage/></ProtectedRoute>}/>
<Route path="/settings" element={<ProtectedRoute><SettingPage/></ProtectedRoute>}/>
<Route path="/profile" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>

        

{/*Unprotected routes for testing*/}
        {/* Dashboard */}
         {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        {/*Inventory page*/}
        {/* <Route path="/inventory" element={<Inventory/>}/> */}


      </Routes>
  );
}

export default App;
