import { useWorkspace } from "../../context/WorkspaceContext";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Plus, Check, Settings, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
    const { currentWorkspace, workspaces, setCurrentWorkspace } = useWorkspace();
    const { logout } = useAuth();
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
        <header className="h-14 flex items-center justify-between px-6 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">

            {/* Left Side - Workspace Switcher & Search */}
            <div className="flex items-center gap-4 flex-1">
                {/* Workspace Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setIsWsOpen(!isWsOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-gray-100 transition-colors text-sm font-medium text-gray-700"
                    >
                        <div className="w-5 h-5 rounded bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
                            {currentWorkspace ? currentWorkspace.name.substring(0, 1).toUpperCase() : "W"}
                        </div>
                        <span className="hidden sm:inline">{currentWorkspace?.name || "Select Workspace"}</span>
                        <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isWsOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Workspace Dropdown */}
                    <AnimatePresence>
                        {isWsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 w-64 z-50"
                            >
                                <div className="text-xs font-semibold text-gray-500 px-3 py-2">
                                    WORKSPACES
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {workspaces.map(ws => (
                                        <button
                                            key={ws.id}
                                            onClick={() => handleWsSwitch(ws)}
                                            className={`w-full text-left px-3 py-2 rounded text-sm flex items-center justify-between transition-colors
                                                ${currentWorkspace?.id === ws.id
                                                    ? 'bg-gray-100 text-gray-900 font-medium'
                                                    : 'text-gray-700 hover:bg-gray-50'}`}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div className="w-5 h-5 rounded bg-gray-900 flex items-center justify-center text-white text-xs font-bold">
                                                    {ws.name.substring(0, 1).toUpperCase()}
                                                </div>
                                                <span>{ws.name}</span>
                                            </div>
                                            {currentWorkspace?.id === ws.id && (
                                                <Check className="w-4 h-4 text-gray-900" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="border-t border-gray-200 mt-2 pt-2">
                                    <button
                                        onClick={handleNewWorkspace}
                                        className="w-full text-left px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 font-medium flex items-center gap-2 transition-colors"
                                    >
                                        <Plus className="w-4 h-4" /> New Workspace
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsWsOpen(false);
                                            navigate("/dashboard/workspace");
                                        }}
                                        className="w-full text-left px-3 py-2 rounded text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 transition-colors"
                                    >
                                        <Settings className="w-4 h-4" /> Workspace Settings
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Search Bar - Hidden on mobile */}
                <div className="relative flex-1 max-w-md hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-gray-50 border border-gray-200 text-sm text-gray-900 rounded pl-9 pr-4 py-2 focus:outline-none focus:border-gray-300 focus:bg-white transition-all placeholder-gray-400"
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-gray-100 transition-colors"
                    >
                        <div className="w-7 h-7 rounded-full bg-gray-900 flex items-center justify-center text-white text-sm font-medium">
                            <User className="w-4 h-4" />
                        </div>
                    </button>

                    <AnimatePresence>
                        {isProfileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 top-10 w-56 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-50"
                            >
                                <div className="px-4 py-3 border-b border-gray-200">
                                    <p className="text-sm font-semibold text-gray-900">Guest User</p>
                                    <p className="text-xs text-gray-500">user@example.com</p>
                                </div>
                                <div className="p-1">
                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            navigate("/dashboard/profile");
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2 transition-colors"
                                    >
                                        <User className="w-4 h-4" /> Profile
                                    </button>
                                    <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded flex items-center gap-2 transition-colors">
                                        <Settings className="w-4 h-4" /> Settings
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded flex items-center gap-2 transition-colors"
                                    >
                                        <LogOut className="w-4 h-4" /> Logout
                                    </button>
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
