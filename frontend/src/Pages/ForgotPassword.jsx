import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/common/AnimatedBackground";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />

      <div className="w-full max-w-md relative z-10">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to login
          </Link>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {!submitted ? (
            <>
              <div className="mb-8">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Mail className="w-6 h-6 text-gray-700" />
                </div>
                <h1 className="text-3xl font-bold mb-2">
                  <span className="text-gradient-fast">Forgot password?</span>
                </h1>
                <p className="text-gray-600 text-reveal-delay-1">
                  No worries, we'll send you reset instructions
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-300 transition-colors"
                    placeholder="you@example.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gray-900 text-white px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition-all disabled:opacity-50 text-sm magnetic-hover"
                >
                  {loading ? "Sending..." : "Reset password"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Check your email</h2>
              <p className="text-gray-600 mb-6">
                We sent a password reset link to<br />
                <span className="font-medium text-gray-900">{email}</span>
              </p>
              <Link
                to="/login"
                className="text-gray-900 font-semibold hover:text-gray-700 transition-colors text-sm"
              >
                Back to login
              </Link>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;
