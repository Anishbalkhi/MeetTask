import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useWorkspace } from '../context/WorkspaceContext';
import { MessageCircle, Plus, LayoutGrid, Users, CheckCircle, Clock, Video, Calendar, TrendingUp, Zap } from 'lucide-react';

const Dashboard = () => {
  const { logout } = useAuth();
  const { workspaces } = useWorkspace();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div className="min-h-screen">

      {/* NAVBAR */}
      <nav className="bg-white/90 backdrop-blur-xl shadow-sm sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/dashboard" className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-800">MeetTask</span>
          </Link>

          <div className="flex items-center gap-4">
            <span className="text-gray-600 font-medium hidden md:block">Welcome back!</span>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 font-semibold transition-all shadow-md"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-5xl font-extrabold text-gray-900 mb-3">
            Your Dashboard
          </h1>
          <p className="text-gray-600 text-xl">
            Manage your meetings, tasks, and workspaces all in one place.
          </p>
        </div>

        {/* STATS GRID */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Video className="w-7 h-7" />,
              label: "Active Meetings",
              value: "0",
              gradient: "from-blue-500 to-indigo-500",
              bg: "card-blue-bg"
            },
            {
              icon: <CheckCircle className="w-7 h-7" />,
              label: "Tasks Completed",
              value: "0",
              gradient: "from-green-500 to-teal-500",
              bg: "card-green-bg"
            },
            {
              icon: <Clock className="w-7 h-7" />,
              label: "Pending Tasks",
              value: "0",
              gradient: "from-orange-500 to-yellow-500",
              bg: "card-yellow-bg"
            },
            {
              icon: <LayoutGrid className="w-7 h-7" />,
              label: "Workspaces",
              value: workspaces?.length || 0,
              gradient: "from-purple-500 to-pink-500",
              bg: "card-purple-bg"
            },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={`${stat.bg} rounded-2xl shadow-xl p-6 hover:shadow-2xl transition-all hover:-translate-y-1`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-gradient-to-br ${stat.gradient} rounded-xl shadow-lg`}>
                  <div className="text-white">{stat.icon}</div>
                </div>
                <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
              </div>
              <p className="text-gray-800 font-semibold text-sm">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* QUICK ACTIONS */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          <motion.div
            className="bg-gradient-to-br from-purple-600 to-blue-600 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate('/create-meeting')}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12" />

            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                  <Video className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Start a Meeting</h3>
              </div>
              <p className="text-purple-100 mb-6">
                Create an AI-powered meeting with live transcription and task creation.
              </p>
              <button className="bg-white text-purple-600 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center gap-2 group-hover:gap-3">
                Create Meeting
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </motion.div>

          <motion.div
            className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100 relative overflow-hidden group cursor-pointer hover:shadow-2xl transition-all"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            onClick={() => navigate('/create-workspace')}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg">
                <LayoutGrid className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Create Workspace</h3>
            </div>
            <p className="text-gray-600 mb-6">
              Organize your team and projects in dedicated workspaces.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2 group-hover:gap-3">
              New Workspace
              <Plus className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        {/* WORKSPACES SECTION */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-gray-900">Your Workspaces</h2>
            <button
              onClick={() => navigate('/create-workspace')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-5 h-5" />
              Create Workspace
            </button>
          </div>

          {workspaces && workspaces.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {workspaces.map((workspace, index) => (
                <motion.div
                  key={workspace.id}
                  className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all group"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => navigate(`/workspace/${workspace.id}`)}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-gradient-to-br from-purple-400 to-pink-400 rounded-xl shadow-md">
                      <LayoutGrid className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {workspace.role || 'Member'}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                    {workspace.name}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {workspace.description || 'No description provided'}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>{workspace.memberCount || 1} members</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{workspace.meetingCount || 0} meetings</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              className="bg-white rounded-3xl shadow-xl p-12 text-center border border-gray-100"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-purple-100 rounded-full">
                  <LayoutGrid className="w-16 h-16 text-purple-600" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                No workspaces yet
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Create your first workspace to start organizing meetings and collaborating with your team.
              </p>
              <button
                onClick={() => navigate('/create-workspace')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Your First Workspace
              </button>
            </motion.div>
          )}
        </div>

        {/* RECENT ACTIVITY */}
        <div className="mt-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Recent Activity</h2>
          <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
            <div className="text-center text-gray-500 py-8">
              <TrendingUp className="w-12 h-12 mx-auto mb-3 text-gray-400" />
              <p>No recent activity to display</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
