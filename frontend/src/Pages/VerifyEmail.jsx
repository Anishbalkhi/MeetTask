import { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { verifyEmailApi } from "../api/authApi";

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    verifyEmailApi(params.get("token")).then(() => {
      setTimeout(() => navigate("/login"), 2500);
    });
  }, []);

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
          <h2 className="text-2xl font-bold text-meettask-accent mb-3">
            Email Verified 🎉
          </h2>
          <p className="text-meettask-text">
            Redirecting you to login...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
