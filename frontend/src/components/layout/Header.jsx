import { useWorkspace } from "../../context/WorkspaceContext";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiChevronDown, FiLogOut, FiSettings, FiPlus, FiCheck } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const { currentWorkspace, workspaces, setCurrentWorkspace } = useWorkspace();
    const { logout, user } = useAuth();
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const [isWsOpen, setIsWsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    const handleWsSwitch = (ws) => {
        setCurrentWorkspace(ws);
        setIsWsOpen(false);
    };

    const handleNewWorkspace = () => {
        setIsWsOpen(false);
        navigate("/dashboard/create-workspace");
    };

    return (
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40 bg-white/95 backdrop-blur-lg border-b border-slate-200/60 shadow-sm">

            {/* Left Side - Workspace Switcher */}
            <div className="flex items-center gap-6 animate-fade-in">
                {/* Workspace Switcher */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        onClick={() => setIsWsOpen(!isWsOpen)}
                        className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 hover:border-slate-300 transition-all group shadow-sm hover:shadow-md"
                    >
                        <div className="w-9 h-9 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                            {currentWorkspace ? currentWorkspace.name.substring(0, 2).toUpperCase() : "WS"}
                        </div>
                        <div className="text-left hidden sm:block">
                            <p className="text-slate-900 font-bold text-sm leading-tight">
                                {currentWorkspace?.name || "Select Workspace"}
                            </p>
                            <p className="text-slate-500 text-xs font-medium">Workspace</p>
                        </div>
                        <FiChevronDown className={`text-slate-500 transition-transform ml-1 ${isWsOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    {/* Workspace Dropdown */}
                    <AnimatePresence>
                        {isWsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute left-0 top-14 bg-white border border-slate-200 rounded-2xl shadow-2xl p-2 w-80 flex flex-col gap-1 z-50 origin-top-left"
                            >
                                <div className="px-4 py-3 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-100">
                                    Switch Workspace
                                </div>
                                <div className="max-h-72 overflow-y-auto scrollbar-thin py-1">
                                    {workspaces.map(ws => (
                                        <motion.button
                                            key={ws.id}
                                            whileHover={{ x: 2 }}
                                            onClick={() => handleWsSwitch(ws)}
                                            className={`w-full text-left px-4 py-3 rounded-xl text-sm transition-all flex items-center justify-between group/item
                                                ${currentWorkspace?.id === ws.id
                                                    ? 'bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 font-semibold border border-blue-200/50'
                                                    : 'text-slate-700 hover:bg-slate-50'}`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center text-white font-bold text-xs">
                                                    {ws.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <span>{ws.name}</span>
                                            </div>
                                            {currentWorkspace?.id === ws.id && (
                                                <FiCheck className="text-blue-600" />
                                            )}
                                        </motion.button>
                                    ))}
                                </div>
                                <div className="mt-1 pt-2 border-t border-slate-100"></div>
                                <motion.button
                                    whileHover={{ x: 2 }}
                                    onClick={handleNewWorkspace}
                                    className="text-left px-4 py-3 rounded-xl hover:bg-blue-50 text-sm text-blue-600 font-semibold transition-all flex items-center gap-2"
                                >
                                    <FiPlus className="text-base" /> Create New Workspace
                                </motion.button>
                                <motion.button
                                    whileHover={{ x: 2 }}
                                    onClick={() => {
                                        setIsWsOpen(false);
                                        navigate("/dashboard/workspace");
                                    }}
                                    className="text-left px-4 py-3 rounded-xl hover:bg-slate-50 text-sm text-slate-700 font-medium transition-all flex items-center gap-2"
                                >
                                    <FiSettings className="text-base" /> Workspace Settings
                                </motion.button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">

                {/* Search Bar */}
                <div className="relative group hidden md:block">
                    <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-purple-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="bg-gradient-to-br from-slate-50 to-white border border-slate-200/80 text-sm text-slate-800 rounded-xl py-3 pl-11 pr-4 w-72 focus:outline-none focus:bg-white focus:border-purple-400 focus:ring-2 focus:ring-purple-100 transition-all placeholder-slate-400 shadow-sm font-medium"
                    />
                </div>

                <div className="h-9 w-px bg-slate-200"></div>

                {/* Notifications */}
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative p-2.5 text-slate-600 hover:text-slate-900 transition-colors bg-gradient-to-br from-slate-50 to-white rounded-xl hover:bg-slate-100 border border-slate-200/80 hover:border-slate-300 shadow-sm"
                >
                    <FiBell className="text-lg" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                </motion.button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 focus:outline-none px-2 py-1.5 rounded-xl hover:bg-slate-50 transition-all border border-transparent hover:border-slate-200 shadow-sm"
                    >
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-purple-600 p-0.5 shadow-md">
                            <img
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                alt="Profile"
                                className="w-full h-full rounded-[10px] object-cover border-2 border-white"
                            />
                        </div>
                        <FiChevronDown className={`text-slate-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </motion.button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                transition={{ duration: 0.2 }}
                                className="absolute right-0 top-14 w-64 bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden py-1 z-50 origin-top-right"
                            >
                                <div className="px-4 py-4 border-b border-slate-100 bg-gradient-to-br from-slate-50 to-white">
                                    <p className="text-sm font-bold text-slate-900">Guest User</p>
                                    <p className="text-xs text-slate-500 mt-0.5 truncate">user@example.com</p>
                                </div>
                                <div className="p-1.5">
                                    <motion.button
                                        whileHover={{ x: 2 }}
                                        className="w-full text-left px-3 py-2.5 text-sm text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-all rounded-xl flex items-center gap-2 font-medium"
                                    >
                                        <FiSettings /> Settings
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ x: 2 }}
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 hover:text-red-700 transition-all rounded-xl flex items-center gap-2 font-medium"
                                    >
                                        <FiLogOut /> Logout
                                    </motion.button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
};

export default Header;
