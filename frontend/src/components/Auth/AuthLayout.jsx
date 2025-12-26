import { motion } from "framer-motion";

const AuthLayout = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-meettask-gradient flex items-center justify-center px-6">

      {/* background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="blob blur-2xl opacity-30"></div>
        <div className="blob2 blur-2xl opacity-30"></div>
      </div>

      {/* animated card */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl"
      >
        <div className="bg-meettask-card backdrop-blur-xl rounded-3xl shadow-2xl p-12">

          <h1 className="text-3xl font-bold text-meettask-primary mb-2">
            {title}
          </h1>

          {subtitle && (
            <p className="text-meettask-text mb-8">
              {subtitle}
            </p>
          )}

          {children}
        </div>
      </motion.div>
    </div>
  );
};

export default AuthLayout;
