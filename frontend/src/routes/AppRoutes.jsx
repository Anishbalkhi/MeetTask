import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import ForgotPassword from "../pages/ForgotPassword";
import ResetPassword from "../pages/ResetPassword";
import VerifyEmail from "../pages/VerifyEmail";
import VerifyInfo from "../pages/VerifyInfo";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../components/layout/ProtectedRoute";
// import CreateMeeting from "../pages/CreateMeeting";

const AppRoutes = () => {
  return (
    <Routes>

      <Route path="/" element={<Home />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-info" element={<VerifyInfo />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      {/* <Route path="/meet" element={<CreateMeeting />} /> */}


      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />

    </Routes>
  );
};

export default AppRoutes;
