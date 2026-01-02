import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { loginApi } from "../api/authApi";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const { login, token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already logged in
  useEffect(() => {
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    setError("");
    try {
      setLoading(true);
      const res = await loginApi(form);
      if (res.data && res.data.token) {
        login(res.data.token);
        navigate("/dashboard");
      } else {
        setError("Login failed: Invalid response from server");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-meettask-gradient px-6 lg:px-0">
      
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
        {/* LEFT CONTENT (Optional Illustration or Text) */}
        <div className="hidden lg:flex flex-col justify-center px-10">
          <motion.h1
            className="text-4xl font-extrabold text-meettask-primary mb-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Welcome to MeetTask
          </motion.h1>
          <motion.p
            className="text-meettask-light text-lg mb-6"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Sign in to manage your meetings, extract tasks, and get work done!
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

        {/* RIGHT FORM */}
        <motion.div
          className="bg-meettask-card backdrop-blur-xl rounded-3xl shadow-2xl p-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold text-meettask-accent text-center mb-6">
            Sign In to MeetTask
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >
            {/* ERROR MESSAGE */}
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3">
                <p className="text-red-500 text-sm">{error}</p>
              </div>
            )}

            {/* EMAIL */}
            <div>
              <label className="block text-meettask-text font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => {
                  setForm({ ...form, email: e.target.value });
                  setError("");
                }}
                required
                className="w-full px-4 py-3 rounded-lg border-gray-800 bg-meettask-input text-meettask-text outline-none focus:ring-2 focus:ring-meettask-primary  transition"
                placeholder="you@example.com"
              />
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-meettask-text font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => {
                  setForm({ ...form, password: e.target.value });
                  setError("");
                }}
                required
                className="w-full px-4 py-3 rounded-lg bg-meettask-input text-meettask-text outline-none focus:ring-2 focus:ring-meettask-primary transition"
                placeholder="••••••••"
              />
            </div>

            {/* SIGN IN BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-lg border-gray-700 border-2 font-semibold text-gray-700 transition
                ${loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-meettask-accent hover:scale-105"
                }`}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* LINKS */}
          <div className="mt-6 text-center text-meettask-text text-sm">
            <Link to="/forgot-password" className="text-meettask-primary hover:underline">
              Forgot password?
            </Link>
            <span className="mx-2 text-meettask-text">|</span>
            <Link to="/register" className="text-meettask-primary hover:underline">
              Create an account
            </Link>
          </div>

          {/* GOOGLE LOGIN */}
          <motion.a
            href="http://localhost:8080/oauth2/authorization/google"
            className="flex items-center justify-center gap-2 border border-meettask-primary rounded-lg py-2 mt-6 hover:bg-meettask-primary/10 transition text-meettask-primary font-medium"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <img src="/Google__G__logo.svg.webp" className="w-6" alt="Google logo" />
            Continue with Google
          </motion.a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
