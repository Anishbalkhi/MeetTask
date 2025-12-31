import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { verifyEmailApi } from "../api/authApi";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("verifying");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const token = params.get("token");
    if (!token) {
      setStatus("error");
      setMessage("Invalid verification link");
      setTimeout(() => navigate("/login"), 3000);
      return;
    }

    verifyEmailApi(token)
      .then(() => {
        setStatus("success");
        setMessage("Email verified successfully! Redirecting to login...");
        setTimeout(() => navigate("/login"), 2500);
      })
      .catch((error) => {
        setStatus("error");
        setMessage(error.response?.data?.message || "Verification failed. The link may be invalid or expired.");
        setTimeout(() => navigate("/login"), 3000);
      });
  }, [params, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-meettask-gradient px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="blob blur-2xl opacity-30"></div>
        <div className="blob2 blur-2xl opacity-30"></div>
      </div>

      <motion.div
        className="relative z-10 w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="bg-meettask-card backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center">
          <h2 className={`text-2xl font-bold mb-3 ${
            status === "success" ? "text-meettask-accent" : 
            status === "error" ? "text-red-500" : 
            "text-meettask-primary"
          }`}>
            {status === "success" && "Email Verified 🎉"}
            {status === "error" && "Verification Failed"}
            {status === "verifying" && "Verifying Email..."}
          </h2>
          <p className="text-meettask-text">
            {message}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
