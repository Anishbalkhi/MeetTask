import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiBox, FiMessageSquare, FiVideo, FiCommand, FiGrid, FiSettings } from "react-icons/fi";
import { motion } from "framer-motion";

const Sidebar = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname.includes(path);

    const navItems = [
        { icon: FiHome, label: "Home", path: "/dashboard/home" },
        { icon: FiUsers, label: "Team", path: "/dashboard/team" },
    ];

    const secondaryItems = [
        { icon: FiMessageSquare, label: "Chat", path: "/dashboard/chat" },
        { icon: FiVideo, label: "Meet", path: "/dashboard/meet" },
        { icon: FiCommand, label: "AI", path: "/dashboard/ai" },
    ];

    return (
        <aside className="w-[72px] bg-gradient-to-b from-slate-50 to-white flex flex-col items-center py-6 border-r border-slate-200/80 fixed left-0 top-0 h-full z-50 text-slate-700 shadow-sm">

            {/* App Logo / Brand */}
            <Link to="/dashboard" className="mb-8 group">
                <motion.div
                    className="w-11 h-11 rounded-xl bg-slate-100 flex items-center justify-center text-slate-800 font-black text-xl hover:bg-slate-200 transition-colors duration-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    M
                </motion.div>
            </Link>

            {/* Divider */}
            <div className="w-9 h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent mb-6"></div>

            {/* Primary Nav Links */}
            <nav className="flex flex-col gap-2 w-full items-center px-3">
                {navItems.map((item, index) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className="group relative w-full"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`flex items-center justify-center w-full h-12 rounded-xl transition-all duration-300 relative overflow-hidden
                                ${isActive(item.path)
                                    ? "bg-purple-600 text-white shadow-md"
                                    : "hover:bg-slate-100 text-slate-600 hover:text-slate-900"
                                }
                            `}
                        >
                            <item.icon className="text-[22px] relative z-10" />

                            {/* Active indicator bar */}
                            {isActive(item.path) && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="absolute -left-3 w-1.5 h-8 bg-white rounded-r-full shadow-md"
                                    initial={false}
                                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                />
                            )}
                        </motion.div>

                        {/* Enhanced Tooltip */}
                        <div className="absolute left-16 px-3 py-1.5 bg-slate-900 rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            {item.label}
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Elegant Divider */}
            <div className="w-9 h-[2px] bg-gradient-to-r from-transparent via-slate-300 to-transparent my-6"></div>

            {/* Secondary Links */}
            <nav className="flex flex-col gap-2 w-full items-center px-3">
                {secondaryItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className="group relative w-full"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center justify-center w-full h-11 rounded-xl transition-all duration-200 hover:bg-slate-100 text-slate-500 hover:text-slate-800"
                        >
                            <item.icon className="text-[20px]" />
                        </motion.div>

                        {/* Tooltip */}
                        <div className="absolute left-16 px-3 py-1.5 bg-slate-900 rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            {item.label}
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                    </Link>
                ))}
            </nav>

            {/* Settings at Bottom */}
            <div className="mt-auto px-3 w-full">
                <Link to="/dashboard/workspace">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full h-11 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-800 transition-all duration-200 group relative"
                    >
                        <FiSettings className="text-xl" />

                        {/* Tooltip */}
                        <div className="absolute left-16 px-3 py-1.5 bg-slate-900 rounded-lg text-xs font-semibold text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            Settings
                            <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-slate-900 rotate-45"></div>
                        </div>
                    </motion.button>
                </Link>
            </div>

        </aside>
    );
};

export default Sidebar;
