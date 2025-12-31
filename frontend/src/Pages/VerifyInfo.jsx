import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";

const VerifyInfo = () => {
  const location = useLocation();
  const email = location.state?.email;
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
        transition={{ duration: 0.5 }}
      >
        <div className="bg-meettask-card backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center">
          {/* Email Icon */}
          <motion.div
            className="mb-6 flex justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <div className="w-20 h-20 bg-meettask-primary/20 rounded-full flex items-center justify-center">
              <svg
                className="w-10 h-10 text-meettask-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
          </motion.div>

          <h2 className="text-3xl font-bold text-meettask-accent mb-4">
            Check Your Email
          </h2>

          <p className="text-meettask-text mb-4 leading-relaxed">
            We've sent a verification link to your email address. Please check
            your inbox and click on the link to verify your account.
          </p>

          {email && (
            <div className="bg-meettask-primary/10 border border-meettask-primary/30 rounded-lg p-3 mb-6">
              <p className="text-sm text-meettask-text/90 font-medium">
                Email sent to: <span className="text-meettask-primary font-semibold">{email}</span>
              </p>
            </div>
          )}

          <div className="bg-meettask-input/50 rounded-lg p-4 mb-6">
            <p className="text-sm text-meettask-text/80 mb-2">
              Didn't receive the email?
            </p>
            <ul className="text-sm text-meettask-text/70 text-left space-y-1 list-disc list-inside">
              <li>Check your spam/junk folder</li>
              <li>Make sure you entered the correct email address</li>
              <li>Wait a few minutes and try again</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              to="/login"
              className="block w-full bg-meettask-accent border-2 border-gray-700 text-gray-700 font-semibold py-3 rounded-lg hover:scale-105 transition text-center"
            >
              Back to Sign In
            </Link>
            <p className="text-sm text-meettask-text/70">
              Already verified?{" "}
              <Link
                to="/login"
                className="text-meettask-primary hover:underline font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyInfo;

