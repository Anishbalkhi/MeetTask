import { useWorkspace } from "../../context/WorkspaceContext";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Search, ChevronDown, Plus, Check, Settings, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "../ThemeToggle";

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
        <header
            className="h-14 flex items-center justify-between px-6 sticky top-0 z-40"
            style={{
                background: 'var(--bg-primary)',
                borderBottom: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-sm)'
            }}
        >

            {/* Left Side - Workspace Switcher & Search */}
            <div className="flex items-center gap-4 flex-1">
                {/* Workspace Switcher */}
                <div className="relative">
                    <button
                        onClick={() => setIsWsOpen(!isWsOpen)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded transition-colors text-sm font-medium"
                        style={{
                            color: 'var(--text-secondary)',
                            background: 'transparent'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <div
                            className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                            style={{
                                background: 'var(--accent-primary)',
                                color: 'var(--text-inverse)'
                            }}
                        >
                            {currentWorkspace ? currentWorkspace.name.substring(0, 1).toUpperCase() : "W"}
                        </div>
                        <span className="hidden sm:inline">{currentWorkspace?.name || "Select Workspace"}</span>
                        <ChevronDown
                            className={`w-4 h-4 transition-transform ${isWsOpen ? 'rotate-180' : ''}`}
                            style={{ color: 'var(--text-tertiary)' }}
                        />
                    </button>

                    {/* Workspace Dropdown */}
                    <AnimatePresence>
                        {isWsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute left-0 top-10 rounded-lg p-2 w-64 z-50"
                                style={{
                                    background: 'var(--bg-elevated)',
                                    border: '1px solid var(--border-primary)',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                <div className="text-xs font-semibold px-3 py-2" style={{ color: 'var(--text-muted)' }}>
                                    WORKSPACES
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {workspaces.map(ws => (
                                        <button
                                            key={ws.id}
                                            onClick={() => handleWsSwitch(ws)}
                                            className="w-full text-left px-3 py-2 rounded text-sm flex items-center justify-between transition-colors"
                                            style={{
                                                background: currentWorkspace?.id === ws.id ? 'var(--bg-hover)' : 'transparent',
                                                color: currentWorkspace?.id === ws.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                                fontWeight: currentWorkspace?.id === ws.id ? '500' : '400'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (currentWorkspace?.id !== ws.id) {
                                                    e.currentTarget.style.background = 'var(--bg-hover)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (currentWorkspace?.id !== ws.id) {
                                                    e.currentTarget.style.background = 'transparent';
                                                }
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="w-5 h-5 rounded flex items-center justify-center text-xs font-bold"
                                                    style={{
                                                        background: 'var(--accent-primary)',
                                                        color: 'var(--text-inverse)'
                                                    }}
                                                >
                                                    {ws.name.substring(0, 1).toUpperCase()}
                                                </div>
                                                <span>{ws.name}</span>
                                            </div>
                                            {currentWorkspace?.id === ws.id && (
                                                <Check className="w-4 h-4" style={{ color: 'var(--text-primary)' }} />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-2 pt-2" style={{ borderTop: '1px solid var(--border-primary)' }}>
                                    <button
                                        onClick={handleNewWorkspace}
                                        className="w-full text-left px-3 py-2 rounded text-sm font-medium flex items-center gap-2 transition-colors"
                                        style={{ color: 'var(--text-secondary)', background: 'transparent' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <Plus className="w-4 h-4" /> New Workspace
                                    </button>
                                    <button
                                        onClick={() => {
                                            setIsWsOpen(false);
                                            navigate("/dashboard/workspace");
                                        }}
                                        className="w-full text-left px-3 py-2 rounded text-sm flex items-center gap-2 transition-colors"
                                        style={{ color: 'var(--text-secondary)', background: 'transparent' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
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
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-tertiary)' }} />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full text-sm rounded pl-9 pr-4 py-2 focus:outline-none transition-all"
                        style={{
                            background: 'var(--input-bg)',
                            border: '1px solid var(--input-border)',
                            color: 'var(--text-primary)'
                        }}
                        onFocus={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border-hover)';
                            e.currentTarget.style.background = 'var(--bg-primary)';
                        }}
                        onBlur={(e) => {
                            e.currentTarget.style.borderColor = 'var(--input-border)';
                            e.currentTarget.style.background = 'var(--input-bg)';
                        }}
                    />
                </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
                {/* Theme Toggle */}
                <ThemeToggle />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-2 px-2 py-1.5 rounded transition-colors"
                        style={{ background: 'transparent' }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                        <div
                            className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-medium"
                            style={{
                                background: 'var(--accent-primary)',
                                color: 'var(--text-inverse)'
                            }}
                        >
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
                                className="absolute right-0 top-10 w-56 rounded-lg overflow-hidden z-50"
                                style={{
                                    background: 'var(--bg-elevated)',
                                    border: '1px solid var(--border-primary)',
                                    boxShadow: 'var(--shadow-lg)'
                                }}
                            >
                                <div
                                    className="px-4 py-3"
                                    style={{ borderBottom: '1px solid var(--border-primary)' }}
                                >
                                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Guest User</p>
                                    <p className="text-xs" style={{ color: 'var(--text-muted)' }}>user@example.com</p>
                                </div>
                                <div className="p-1">
                                    <button
                                        onClick={() => {
                                            setIsProfileOpen(false);
                                            navigate("/dashboard/profile");
                                        }}
                                        className="w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2 transition-colors"
                                        style={{ color: 'var(--text-secondary)', background: 'transparent' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <User className="w-4 h-4" /> Profile
                                    </button>
                                    <button
                                        className="w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2 transition-colors"
                                        style={{ color: 'var(--text-secondary)', background: 'transparent' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'var(--bg-hover)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                                    >
                                        <Settings className="w-4 h-4" /> Settings
                                    </button>
                                    <button
                                        onClick={handleLogout}
                                        className="w-full text-left px-3 py-2 text-sm rounded flex items-center gap-2 transition-colors"
                                        style={{ color: '#ef4444', background: 'transparent' }}
                                        onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'}
                                        onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
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
