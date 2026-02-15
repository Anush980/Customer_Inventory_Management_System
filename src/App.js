/* eslint-disable no-unused-vars */
import "./App.css";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import Reset from "./pages/resetPassword";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./components/ui/icon";
import Inventory from "./pages/inventory";
import ProtectedRoute from "./ProtectedRoutes";
import CustomerPage from "./pages/customer";
import SalesBookPage from "./pages/salesbook";
import SettingPage from "./pages/setting";
import ProfilePage from "./pages/profile";
import LandingPage from "./pages/landing";
import Pos from "./pages/pos";
import { Navigate } from "react-router-dom";
import StaffPage from "./pages/staff";
import TermsPage from "./pages/terms/TermsPage";
import PolicyPage from "./pages/policy/PolicyPage";
import UserPage from "./pages/user";
import AdminPage from "./pages/admin";
import ForgotPassword from "./pages/forgotPassword";
import VerifyOtp from "./pages/verifyOtp";
import ResetPassword from "./pages/resetPassword";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  return (
    <>
      <SpeedInsights />
      <Routes>
      {/* Auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/reset-password" element={<ResetPassword />} />

      <Route
        path="/"
        element={
          localStorage.getItem("token") ? (
            localStorage.getItem("role") === "admin" ? (
              <Navigate to="/user" replace />
            ) : (
              <Navigate to="/dashboard" replace />
            )
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Default page */}
      <Route path="/*" element={<LandingPage />} />
      <Route path="/terms" element={<TermsPage />} />
      <Route path="/policy" element={<PolicyPage />} />

      {/*protected routes for testing*/}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/inventory"
        element={
          <ProtectedRoute>
            <Inventory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/customer"
        element={
          <ProtectedRoute>
            <CustomerPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/sales"
        element={
          <ProtectedRoute>
            <SalesBookPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/pos"
        element={
          <ProtectedRoute>
            <Pos />
          </ProtectedRoute>
        }
      />
      <Route
        path="/staff"
        element={
          <ProtectedRoute>
            <StaffPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/user"
        element={
          <ProtectedRoute>
            <UserPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <AdminPage />
          </ProtectedRoute>
        }
      />

      {/*Unprotected routes for testing*/}
      {/* Dashboard */}
      {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
      {/*Inventory page*/}
      {/* <Route path="/inventory" element={<Inventory/>}/> */}
      </Routes>
    </>
  );
}

export default App;
