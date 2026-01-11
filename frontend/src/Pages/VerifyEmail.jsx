import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/common/AnimatedBackground";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock API call
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleResend = () => {
    alert("Verification code resent!");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />

      <div className="w-full max-w-md relative z-10">

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 bounce-in">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient-fast">Verify your email</span>
            </h1>
            <p className="text-gray-600 text-reveal-delay-1">
              We sent a verification code to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm text-center font-mono tracking-widest focus:outline-none focus:border-gray-300 transition-colors"
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2 magnetic-hover"
            >
              {loading ? "Verifying..." : "Verify email"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
              >
                Resend
              </button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyEmail;
