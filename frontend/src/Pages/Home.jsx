import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";

const Home = () => {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <div className="min-h-screen bg-meettask-gradient relative overflow-hidden">

      {/* BACKGROUND SHAPES */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="blob blur-2xl opacity-30"></div>
        <div className="blob2 blur-2xl opacity-30"></div>
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 bg-white/80 backdrop-blur-md shadow-sm px-6 md:px-12 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-extrabold text-meettask-primary">
          MeetTask
        </Link>

        <div className="flex items-center gap-6">
          {token ? (
            <>
              <Link to="/dashboard" className="font-medium text-meettask-text hover:text-meettask-primary">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="font-medium text-meettask-text hover:text-meettask-primary">
                Login
              </Link>
              <Link
                to="/register"
                className="bg-meettask-accent border-2 border-gray-700 text-gray-700 px-6 py-2 rounded-lg font-semibold"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="relative z-10 min-h-[85vh] flex items-center px-6 lg:px-0">
        <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
              <span className="text-meettask-primary">Meet.</span>{" "}
              <span className="text-meettask-accent">Decide.</span>{" "}
              <span className="text-meettask-primary">Assign.</span>
              <br />
              <span className="text-meettask-text">All in one place.</span>
            </h1>

            <p className="text-lg md:text-xl text-meettask-light mb-8 max-w-xl">
              MeetTask turns meetings into action.  
              Get AI-powered transcripts, smart task suggestions,
              and instant task assignment — without switching tools.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/register"
                className="bg-meettask-accent border-2 border-gray-700 text-gray-700 px-8 py-3 rounded-lg font-semibold text-center"
              >
                Start for Free
              </Link>
              <button className="border-2 border-meettask-primary text-meettask-primary px-8 py-3 rounded-lg font-semibold">
                Watch Demo
              </button>
            </div>

            <p className="text-sm text-meettask-text/70 mt-6">
              No credit card required · AI transcript included
            </p>
          </motion.div>

          {/* HERO IMAGE */}
          <motion.div
            className="flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="/task-management-20.png"
              alt="AI powered video meeting"
              className="w-full max-w-xl object-contain"
            />
          </motion.div>

        </div>
      </section>

      {/* FEATURES */}
      <section className="relative z-10 px-6 md:px-12 lg:px-20 py-24">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">
              <span className="text-meettask-primary">Everything you need</span>{" "}
              <span className="text-meettask-accent">for productive meetings</span>
            </h2>
            <p className="text-lg text-meettask-text/80 max-w-2xl mx-auto">
              Stop losing tasks after meetings. MeetTask ensures every discussion turns into execution.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Live Transcripts",
                desc: "AI captures every word in real-time so nothing gets missed."
              },
              {
                title: "AI Task Suggestions",
                desc: "Automatically convert conversations into structured tasks."
              },
              {
                title: "Instant Assignment",
                desc: "Assign tasks during the meeting — no extra tools needed."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-meettask-card/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-white/60"
                whileHover={{ y: -6, scale: 1.03 }}
              >
                <h3 className="text-xl font-bold text-meettask-accent mb-3">
                  {item.title}
                </h3>
                <p className="text-meettask-text">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 md:px-12 py-24">
        <div className="max-w-4xl mx-auto bg-meettask-card/90 backdrop-blur-xl rounded-3xl shadow-2xl p-12 text-center border border-white/60">

          <img
            src="/Teambuilding.png"
            alt="Team collaboration"
            className="mx-auto mb-10 max-w-md"
          />

          <h2 className="text-4xl font-extrabold text-meettask-primary mb-4">
            Ready to make meetings productive?
          </h2>
          <p className="text-lg text-meettask-text mb-8">
            Join teams that turn conversations into action using MeetTask.
          </p>

          <Link
            to="/register"
            className="inline-block bg-meettask-accent border-2 border-gray-700 text-gray-700 px-10 py-4 rounded-lg font-semibold text-lg"
          >
            Get Started Free
          </Link>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 px-6 md:px-12 py-8 border-t border-white/20 text-center">
        <p className="text-sm text-meettask-text/70">
          © 2024 MeetTask. All rights reserved.
        </p>
      </footer>

    </div>
  );
};

export default Home;
