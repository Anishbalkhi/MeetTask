import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedBackground from "../components/common/AnimatedBackground";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(form.email, form.password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6 py-12 relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <AnimatedBackground />

      <div className="w-full max-w-md relative z-10">

        {/* Back to Home Link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8 font-medium transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to home
          </Link>
        </motion.div>

        <motion.div
          className="bg-white border border-gray-200 rounded-lg p-8 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient-fast">Welcome back</span>
            </h1>
            <p className="text-gray-600 text-reveal-delay-1">
              Sign in to continue to your workspace
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6 shake">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-300 transition-colors"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-300 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-600 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-gray-900" />
                Remember me
              </label>
              <Link
                to="/forgot-password"
                className="text-gray-900 hover:text-gray-700 font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gray-900 text-white px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition-all disabled:opacity-50 text-sm magnetic-hover"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-gray-900 font-semibold hover:text-gray-700 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>

        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </div >
  );
};

export default Login;
