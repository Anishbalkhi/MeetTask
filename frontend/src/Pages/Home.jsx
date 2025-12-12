import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MeetFlow</h1>

        <div className="space-x-6">
          <Link to="/login" className="text-gray-600 hover:text-blue-600">
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </Link>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <section className="px-6 md:px-20 py-20 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side */}
        <div>
          <h1 className="text-5xl font-bold leading-tight text-gray-900">
            Meet. Decide. Assign — <span className="text-blue-600">in one place.</span>
          </h1>

          <p className="mt-6 text-lg text-gray-600">
            Run meetings that actually produce action. AI-powered transcript,
            smart task suggestions, and real-time task assignment — all inside
            your meeting room.
          </p>

          <div className="mt-8 flex space-x-4">
            <Link
              to="/register"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Start for Free
            </Link>

            <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-100">
              Watch Demo
            </button>
          </div>

          <p className="mt-4 text-gray-500 text-sm">
            No credit card required · AI Transcript included · Task automation
          </p>
        </div>

        {/* Right Side — Illustration */}
        <div className="flex justify-center">
          <div className="bg-white p-6 shadow-xl rounded-2xl w-full max-w-lg">

            {/* Fake Meeting Preview */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-gray-200 h-28 rounded-lg animate-pulse"></div>
              <div className="bg-gray-200 h-28 rounded-lg animate-pulse"></div>
              <div className="bg-gray-200 h-28 rounded-lg animate-pulse"></div>
              <div className="bg-gray-200 h-28 rounded-lg animate-pulse"></div>
            </div>

            {/* Task + Transcript preview */}
            <div className="border rounded-lg p-4 bg-gray-50">
              <p className="font-semibold text-gray-700">AI Suggestions</p>
              <ul className="mt-2 text-sm text-gray-600 space-y-1">
                <li>• Finalize API structure for Sprint 4</li>
                <li>• Assign UI redesign to Rohan by Friday</li>
                <li>• Review backend merge conflicts</li>
              </ul>
            </div>

          </div>
        </div>

      </section>

      {/* ---------------- FEATURES SECTION ---------------- */}
      <section className="px-6 md:px-20 py-20 bg-white">
        <h2 className="text-4xl font-bold text-center text-gray-900">
          Everything you need for<br />
          <span className="text-blue-600">productive meetings.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-14">

          {/* Feature 1 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-blue-600">Live Transcripts</h3>
            <p className="mt-3 text-gray-600">
              Capture every word during the meeting with real-time AI transcripts.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-blue-600">AI Task Suggestions</h3>
            <p className="mt-3 text-gray-600">
              AI converts your meeting conversation into clear, structured tasks.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-bold text-blue-600">Task Assignment</h3>
            <p className="mt-3 text-gray-600">
              Assign tasks to participants instantly — no switching tools.
            </p>
          </div>

        </div>
      </section>

      {/* ---------------- CTA SECTION ---------------- */}
      <section className="px-6 md:px-20 py-16 bg-blue-600 text-white text-center">
        <h2 className="text-3xl font-bold">Ready to make your meetings smarter?</h2>
        <p className="mt-3 text-blue-100">
          Try MeetFlow — the AI-powered meeting workspace.
        </p>

        <Link
          to="/register"
          className="inline-block mt-6 bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100"
        >
          Get Started Free
        </Link>
      </section>

    </div>
  );
};

export default Home;
