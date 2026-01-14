import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/common/AnimatedBackground";
import ThemeToggle from "../components/ThemeToggle";

const VerifyEmail = () => {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    
    setTimeout(() => {
      navigate("/dashboard");
    }, 1000);
  };

  const handleResend = () => {
    alert("Verification code resent!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      <AnimatedBackground />

      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">

        <motion.div
          className="rounded-lg p-8"
          style={{
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: 'var(--shadow-lg)'
          }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 bounce-in">
              <Mail className="w-8 h-8 text-blue-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
              Verify your email
            </h1>
            <p className="text-reveal-delay-1" style={{ color: 'var(--text-secondary)' }}>
              We sent a verification code to your email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                className="w-full px-3 py-2 rounded text-sm text-center font-mono tracking-widest focus:outline-none transition-colors"
                style={{
                  background: 'var(--input-bg)',
                  border: '1px solid var(--input-border)',
                  color: 'var(--text-primary)'
                }}
                placeholder="000000"
                maxLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-2.5 rounded font-medium transition-all disabled:opacity-50 text-sm flex items-center justify-center gap-2 magnetic-hover"
              style={{ background: 'var(--accent-primary)', color: 'var(--text-inverse)' }}
            >
              {loading ? "Verifying..." : "Verify email"}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              Didn't receive the code?{" "}
              <button
                onClick={handleResend}
                className="font-semibold transition-colors"
                style={{ color: 'var(--text-primary)' }}
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
