import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { resetPasswordApi } from "../api/authApi";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    const token = params.get("token");
    if (!token) {
      setError("Invalid reset link. Please request a new password reset.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    try {
      setLoading(true);
      await resetPasswordApi(token, password);
      navigate("/login", { state: { message: "Password reset successfully! Please login with your new password." } });
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Invalid or expired token. Please request a new password reset.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

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
        <div className="bg-meettask-card backdrop-blur-xl rounded-3xl shadow-2xl p-12">
          <h2 className="text-2xl font-bold text-meettask-accent text-center mb-4">
            Set new password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            <div>
              <label className="block text-meettask-text font-semibold mb-1">
                New Password
              </label>
              <input
                className="w-full px-4 py-3 rounded-lg bg-meettask-input text-meettask-text outline-none focus:ring-2 focus:ring-meettask-primary transition"
                type="password"
                placeholder="Enter new password (min 6 characters)"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                required
                minLength={6}
              />
              {password && password.length < 6 && (
                <p className="text-yellow-500 text-xs mt-1">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-meettask-accent border-2 border-gray-700 text-gray-700 font-semibold py-3 rounded-lg transition
                ${loading
                  ? "opacity-60 cursor-not-allowed"
                  : "hover:scale-105"
                }`}
            >
              {loading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
