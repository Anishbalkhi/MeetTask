import { Link, useLocation } from "react-router-dom";
import { Home, Users, Settings, Sparkles, Plus } from "lucide-react";
import { motion } from "framer-motion";

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    const navItems = [
        { icon: Home, label: "Home", path: "/dashboard/home" },
        { icon: Users, label: "Team", path: "/dashboard/team" },
    ];

    return (
        <aside className="w-16 bg-gradient-to-b from-[#1E1E1E] to-[#2D2D2D] flex flex-col items-center py-4 fixed left-0 top-0 h-full z-50 border-r border-gray-800">

            {/* App Logo */}
            <Link to="/dashboard" className="mb-8 group relative">
                <motion.div
                    className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                    <Sparkles className="w-5 h-5 text-gray-900" />
                </motion.div>

                {/* Tooltip */}
                <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 rounded text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    MeetTask
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
            </Link>

            {/* Nav Links */}
            <nav className="flex flex-col gap-1 w-full items-center px-2 mb-4">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className="group relative w-full"
                    >
                        <motion.div
                            whileHover={{ scale: 1.08, x: 2 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center justify-center w-full h-10 rounded-lg transition-all relative overflow-hidden
                                ${isActive(item.path)
                                    ? "bg-white text-gray-900 shadow-lg"
                                    : "hover:bg-[#3D3D3D] text-gray-400 hover:text-white"
                                }
                            `}
                        >
                            <item.icon className="w-5 h-5" />

                            {/* Active indicator */}
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -left-2 w-1 h-6 bg-white rounded-r shadow-lg"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.div>

                        {/* Tooltip */}
                        <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 rounded text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            {item.label}
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Divider */}
            <div className="w-8 h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent mb-4"></div>

            {/* Create Button */}
            <Link to="/dashboard/create-workspace" className="group relative w-full px-2">
                <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full h-10 flex items-center justify-center rounded-lg bg-white text-gray-900 transition-all shadow-lg hover:shadow-xl"
                >
                    <Plus className="w-5 h-5" />
                </motion.button>

                {/* Tooltip */}
                <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 rounded text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                    Create
                    <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                </div>
            </Link>

            {/* Settings at Bottom */}
            <div className="mt-auto px-2 w-full">
                <Link to="/dashboard/workspace" className="group relative w-full block">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full h-10 flex items-center justify-center rounded-lg hover:bg-[#2D2D2D] text-gray-400 hover:text-white transition-all"
                    >
                        <Settings className="w-5 h-5" />

                        {/* Tooltip */}
                        <div className="absolute left-14 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900 rounded text-xs font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            Settings
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45"></div>
                        </div>
                    </motion.button>
                </Link>
            </div>

        </aside>
    );
};

export default Sidebar;
