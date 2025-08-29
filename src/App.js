import './App.css';
import Login from './pages/login';
import Register from './pages/register';
import Reset from './pages/reset';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
   
      <Routes>
        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset" element={<Reset />} />

        {/* Optional: default redirect to login */}
        <Route path="*" element={<Login />} />
      </Routes>
  );
}

export default App;
