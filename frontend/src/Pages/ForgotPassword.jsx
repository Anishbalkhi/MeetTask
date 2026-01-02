import { useState } from "react";
import { motion } from "framer-motion";
import { forgotPasswordApi } from "../api/authApi";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    setSuccess("");

    try {
      setLoading(true);
      const res = await forgotPasswordApi(email);
      setSuccess(
        res.data?.message ||
          "If the email exists, a password reset link has been sent."
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-meettask-gradient px-6 lg:px-0 relative overflow-hidden">

      {/* BACKGROUND SHAPES */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="blob blur-2xl opacity-30"></div>
        <div className="blob2 blur-2xl opacity-30"></div>
      </div>

      <motion.div
        className="relative z-10 grid lg:grid-cols-2 gap-10 items-center w-full max-w-6xl"
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
      >
        {/* LEFT CONTENT (SAME SIZE AS LOGIN) */}
        <div className="hidden lg:flex flex-col justify-center px-10">
          <motion.h1
            className="text-4xl font-extrabold text-meettask-primary mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Reset your password
          </motion.h1>

          <motion.p
            className="text-meettask-light text-lg mb-6"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Enter your email and we’ll help you get back into your MeetTask
            account.
          </motion.p>

          <motion.div
            className="w-4/5 bg-white/70 backdrop-blur-md 
                       rounded-3xl p-1 
                       border border-white/60
                       shadow-[0_20px_50px_rgba(0,0,0,0.12)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <img
              src="/meeting-illustration.png"
              alt="Meeting illustration"
              className="w-full rounded-2xl"
            />
          </motion.div>
        </div>

        {/* RIGHT FORM CARD (MATCH LOGIN CARD SIZE) */}
        <motion.div
          className="bg-meettask-card backdrop-blur-xl rounded-3xl shadow-2xl p-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-meettask-accent text-center mb-4">
            Forgot your password?
          </h2>

          <p className="text-center text-meettask-text mb-6">
            We’ll send you a reset link to your email
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {success && (
              <div className="bg-green-500/10 border border-green-500/50 rounded-lg p-3">
                <p className="text-green-500 text-sm">{success}</p>
              </div>
            )}

            <div>
              <label className="block text-meettask-text font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                  setSuccess("");
                }}
                className="w-full px-4 py-3 rounded-lg bg-meettask-input text-meettask-text outline-none focus:ring-2 focus:ring-meettask-primary transition"
                placeholder="you@example.com"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg border-2 border-gray-700 font-semibold text-gray-700 transition
                ${
                  loading
                    ? "opacity-60 cursor-not-allowed"
                    : "bg-meettask-accent hover:scale-105"
                }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          <div className="text-center text-sm mt-6">
            <Link
              to="/login"
              className="text-meettask-primary hover:underline"
            >
              Back to Sign In
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
