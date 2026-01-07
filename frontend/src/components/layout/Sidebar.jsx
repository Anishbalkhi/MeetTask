import { Link, useLocation, useNavigate } from "react-router-dom";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useState } from "react";
import { FiHome, FiUsers, FiBox, FiMessageSquare, FiVideo, FiCommand, FiPlus, FiGrid, FiSettings } from "react-icons/fi";

const Sidebar = () => {
    const { workspaces, currentWorkspace, setCurrentWorkspace } = useWorkspace();
    const location = useLocation();
    const navigate = useNavigate();
    const [isWsOpen, setIsWsOpen] = useState(false);

    const isActive = (path) => location.pathname.includes(path);

    const navItems = [
        { icon: FiHome, label: "Home", path: "/dashboard/home" },
        { icon: FiUsers, label: "Team", path: "/dashboard/team" },
        { icon: FiGrid, label: "Workspace", path: "/dashboard/workspace" },
    ];

    const secondaryItems = [
        { icon: FiMessageSquare, label: "Chat", path: "/dashboard/chat" },
        { icon: FiVideo, label: "Meet", path: "/dashboard/meet" },
        { icon: FiCommand, label: "AI", path: "/dashboard/ai" },
    ];

    const handleWsSwitch = (ws) => {
        setCurrentWorkspace(ws);
        setIsWsOpen(false);
    };

    const handleNewWorkspace = () => {
        setIsWsOpen(false);
        navigate("/dashboard/create-workspace");
    };

    return (
        <aside className="w-[72px] bg-[#0f0f11] flex flex-col items-center py-6 border-r border-white/5 fixed left-0 top-0 h-full z-50 text-gray-500">

            {/* Workspace Switcher (Slack Style) */}
            <div className="relative mb-6 group px-2">
                <button
                    onClick={() => setIsWsOpen(!isWsOpen)}
                    className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white font-bold text-sm shadow-lg hover:ring-2 hover:ring-blue-500/50 transition-all"
                >
                    {currentWorkspace ? currentWorkspace.name.substring(0, 2).toUpperCase() : "WS"}
                </button>

                {/* Dropdown */}
                {isWsOpen && (
                    <div className="absolute left-14 top-0 bg-[#1a1b1e] border border-white/10 rounded-lg shadow-2xl p-1 w-56 flex flex-col gap-1 z-50 animate-fade-in-up origin-top-left">
                        <div className="px-3 py-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest border-b border-white/5 bg-white/5 mb-1">
                            Switch Workspace
                        </div>
                        {workspaces.map(ws => (
                            <button
                                key={ws.id}
                                onClick={() => handleWsSwitch(ws)}
                                className={`text-left px-3 py-2 rounded md:bg-transparent hover:bg-white/5 text-xs transition-colors flex items-center justify-between
                                    ${currentWorkspace?.id === ws.id ? 'text-blue-400 bg-blue-500/10' : 'text-gray-300'}
                                `}
                            >
                                {ws.name}
                                {currentWorkspace?.id === ws.id && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                            </button>
                        ))}
                        <div className="my-1 border-t border-white/5"></div>
                        <button
                            onClick={handleNewWorkspace}
                            className="text-left px-3 py-2 rounded hover:bg-white/5 text-xs text-blue-400 font-medium transition-colors flex items-center gap-2"
                        >
                            <FiPlus /> Create Workspace
                        </button>
                    </div>
                )}
            </div>

            <div className="w-8 h-px bg-white/5 mb-6"></div>

            {/* Nav Links (Linear Style) */}
            <nav className="flex flex-col gap-3 w-full items-center">
                {navItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className={`group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200
                            ${isActive(item.path)
                                ? "bg-blue-500/10 text-blue-400"
                                : "hover:bg-white/5 hover:text-gray-300"
                            }
                        `}
                    >
                        <item.icon className="text-xl" />

                        {/* Tooltip */}
                        <div className="absolute left-14 px-2 py-1 bg-black border border-white/10 rounded text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            {item.label}
                        </div>

                        {isActive(item.path) && (
                            <div className="absolute -left-3 w-1 h-5 bg-blue-500 rounded-r-full" />
                        )}
                    </Link>
                ))}
            </nav>

            <div className="w-8 h-px bg-white/5 my-6"></div>

            {/* Secondary Links */}
            <nav className="flex flex-col gap-3 w-full items-center">
                {secondaryItems.map((item) => (
                    <Link
                        key={item.label}
                        to={item.path}
                        className="group relative flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-200 hover:bg-white/5 hover:text-gray-300"
                    >
                        <item.icon className="text-lg" />
                        <div className="absolute left-14 px-2 py-1 bg-black border border-white/10 rounded text-[10px] font-medium text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50 shadow-xl">
                            {item.label}
                        </div>
                    </Link>
                ))}
            </nav>

            <div className="mt-auto mb-6">
                <button className="w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 text-gray-500 hover:text-white transition-colors">
                    <FiSettings className="text-xl" />
                </button>
            </div>

        </aside>
    );
};

export default Sidebar;
