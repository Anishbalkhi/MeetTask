import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Project from "./project";
const Home = () => {
    const Navigate = useNavigate();
  return (
    <div className="relative h-full w-full overflow-hidden">

      {/* SOFT GRADIENT BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#1a1f3c] via-[#141826] to-[#0d0f15] opacity-95"></div>
      <div className="absolute top-20 right-20 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

      {/* TOP RIGHT PROFILE */}
      <div className="absolute top-4 right-6 flex items-center gap-3 cursor-pointer group">
        <span className="text-gray-300 text-sm">Anish</span>
        <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-white/20 transition">
          <span className="text-white font-medium">A</span>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center max-w-3xl mx-auto px-4">

        {/* ANIMATED WELCOME TEXT */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text"
        >
          Welcome to Your Productivity Hub
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-gray-300 mt-3 text-lg leading-relaxed"
        >
          Organize projects, manage tasks, host meetings, and collaborate with your team — all in one minimal, powerful platform built for speed and clarity.
        </motion.p>

        {/* FEATURE CARDS */}
        <div className="flex justify-center gap-16 mt-14">

          {/* New Project */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex flex-col items-center transition bg-white/5 border border-white/10 w-56 px-6 py-6 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-purple-500/20"
          >
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-500 shadow-xl"></div>

            <p className="mt-4 text-gray-200">Create and manage new projects</p>

            <button onClick={() => Navigate("/project")}className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md">
              New Project
            </button>
          </motion.div>

          {/* Meetings */}
          <motion.div
            whileHover={{ scale: 1.08 }}
            className="flex flex-col items-center transition bg-white/5 border border-white/10 w-56 px-6 py-6 rounded-2xl backdrop-blur-xl shadow-lg hover:shadow-blue-500/20"
          >
            <div className="grid grid-cols-2 gap-2">
              <div className="w-6 h-6 bg-green-400 rounded-full"></div>
              <div className="w-6 h-6 bg-purple-400 rounded-full"></div>
              <div className="w-6 h-6 bg-blue-400 rounded-full"></div>
              <div className="w-6 h-6 bg-orange-400 rounded-full"></div>
            </div>

            <p className="mt-4 text-gray-200">Start an instant meeting</p>

            <button  onClick={() => Navigate("/meet")} className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-md">
              Meet Now
            </button>
          </motion.div>

        </div>

        {/* FOOTER */}
        <p className="mt-12 text-gray-500 text-sm">
          Powered by Tailwind + React + Modern UI Design.
        </p>

      </div>
    </div>
  );
};

export default Home;
