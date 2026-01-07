import { useWorkspace } from "../../context/WorkspaceContext";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiBell, FiChevronDown, FiLogOut, FiSettings } from "react-icons/fi";

const Header = () => {
    const { currentWorkspace } = useWorkspace();
    const { logout, user } = useAuth(); // Assuming user object might have name in future real auth, for now we might decode or use dummy
    const navigate = useNavigate();
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className="h-20 flex items-center justify-between px-8 sticky top-0 z-40 bg-black/20 backdrop-blur-md border-b border-white/5">

            {/* Title / Breadcrumb */}
            <div className="flex items-center gap-4 animate-fade-in">
                {currentWorkspace && (
                    <h2 className="text-white font-bold text-xl tracking-tight drop-shadow-sm">
                        {currentWorkspace.name}
                        <span className="text-gray-500 font-medium text-lg ml-2 hidden sm:inline-block">/ Dashboard</span>
                    </h2>
                )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-6">

                {/* Search Bar */}
                <div className="relative group hidden md:block">
                    <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="bg-white/5 border border-white/10 text-sm text-white rounded-full py-2.5 pl-10 pr-4 w-64 focus:outline-none focus:bg-white/10 focus:border-blue-500 transition-all placeholder-gray-600"
                    />
                </div>

                <div className="h-8 w-px bg-white/10"></div>

                <button className="relative p-2 text-gray-400 hover:text-white transition-colors bg-white/5 rounded-full hover:bg-white/10">
                    <FiBell className="text-xl" />
                    <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-[#141517]"></span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 focus:outline-none p-1 pr-3 rounded-full hover:bg-white/5 transition-colors border border-transparent hover:border-white/5"
                    >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-purple-600 p-[2px]">
                            <img
                                src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                                alt="Profile"
                                className="w-full h-full rounded-full object-cover border-2 border-[#141517]"
                            />
                        </div>
                        <FiChevronDown className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 top-14 w-56 bg-[#1a1b1e] border border-white/10 rounded-xl shadow-2xl overflow-hidden py-1 z-50 animate-fade-in-up origin-top-right ring-1 ring-black/5">
                            <div className="px-4 py-3 border-b border-white/5 bg-white/5">
                                <p className="text-sm font-bold text-white">Guest User</p>
                                <p className="text-xs text-gray-500 truncate">user@example.com</p>
                            </div>
                            <div className="p-1">
                                <button className="w-full text-left px-3 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors rounded-lg flex items-center gap-2">
                                    <FiSettings /> Settings
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors rounded-lg flex items-center gap-2"
                                >
                                    <FiLogOut /> Logout
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
