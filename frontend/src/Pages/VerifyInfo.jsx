import { useNavigate } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/common/AnimatedBackground";

const VerifyInfo = () => {
  const navigate = useNavigate();

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
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 bounce-in">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient-fast">Check your email</span>
            </h1>
            <p className="text-gray-600 mb-8 text-reveal-delay-1">
              We've sent you a verification link. Please check your inbox and click the link to verify your account.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">
                <strong className="text-gray-900">Note:</strong> The verification link will expire in 24 hours.
              </p>
              <p className="text-sm text-gray-600">
                If you don't see the email, check your spam folder.
              </p>
            </div>

            <button
              onClick={() => navigate("/verify-email")}
              className="w-full bg-gray-900 text-white px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition-all text-sm flex items-center justify-center gap-2 magnetic-hover"
            >
              Enter verification code
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="mt-6">
              <p className="text-gray-600 text-sm">
                Already verified?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default VerifyInfo;
