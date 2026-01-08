import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { createWorkspace } from "../api/workspaceApi";
import { useWorkspace } from "../context/WorkspaceContext";
import { FiPlus, FiBriefcase, FiX, FiCopy, FiCheck, FiMail, FiLink } from "react-icons/fi";

const CreateWorkspace = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [emails, setEmails] = useState("");
    const [loading, setLoading] = useState(false);
    const [inviteLink, setInviteLink] = useState("");
    const [copied, setCopied] = useState(false);
    const [workspaceId, setWorkspaceId] = useState("");
    const navigate = useNavigate();
    const { addWorkspaceObj } = useWorkspace();

    // Generate invite link immediately when page loads
    useEffect(() => {
        // Generate a temporary workspace ID (in real app, get from backend)
        const tempId = `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setWorkspaceId(tempId);
        const mockInviteLink = `${window.location.origin}/invite/${tempId}`;
        setInviteLink(mockInviteLink);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createWorkspace({ name, description, tempId: workspaceId });
            addWorkspaceObj(res.data);

            // If emails were provided, send invites (mock)
            if (emails.trim()) {
                console.log(`Sending invites to: ${emails}`);
            }

            // Navigate to dashboard
            setTimeout(() => {
                navigate("/dashboard/home");
            }, 500);

        } catch (error) {
            console.error("Failed to create workspace", error);
            alert(error.response?.data?.message || "Failed to create workspace");
        } finally {
            setLoading(false);
        }
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(inviteLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSkip = () => {
        navigate("/dashboard/home");
    };

    return (
        <div className="max-w-2xl mx-auto pt-12 animate-fade-in-up px-4 pb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#121315]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
            >
                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-white/10">
                            <FiBriefcase className="text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">Create Workspace</h1>
                            <p className="text-gray-400 text-sm">Organize your team and tasks</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    {/* Workspace Name */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Workspace Name *</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all font-medium text-lg"
                            placeholder="e.g. Engineering Team"
                            autoFocus
                            disabled={loading}
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description <span className="text-gray-600 font-normal normal-case">(Optional)</span></label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all resize-none h-24 text-sm"
                            placeholder="What's this workspace for?"
                            disabled={loading}
                        ></textarea>
                    </div>

                    {/* Invite Teammates */}
                    <div className="pt-4 border-t border-white/5">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                            <FiMail className="text-sm" />
                            Add Colleagues by Email <span className="text-gray-600 font-normal normal-case">(Optional)</span>
                        </label>
                        <textarea
                            value={emails}
                            onChange={(e) => setEmails(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all resize-none h-32 text-sm"
                            placeholder="Example: ellis@gmail.com, maria@gmail.com"
                            disabled={loading}
                        ></textarea>
                        <p className="text-xs text-gray-400 mt-3 flex items-start gap-2">
                            <span className="text-yellow-500">ℹ️</span>
                            <span>Invitations expire in 30 days. You can always extend that deadline.</span>
                        </p>
                    </div>

                    {/* Invite Link Section - Always Visible */}
                    <div className="pt-4 border-t border-white/5">
                        <div className="bg-blue-500/5 border border-blue-500/20 rounded-xl p-5">
                            <div className="flex items-center gap-3 mb-3">
                                <div className="p-2 bg-blue-500/10 rounded-lg">
                                    <FiLink className="text-blue-400" />
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-sm">Share Invitation Link</h3>
                                    <p className="text-gray-400 text-xs">Anyone with this link can join your workspace</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="text"
                                    value={inviteLink}
                                    readOnly
                                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-gray-300 text-sm font-mono select-all"
                                    onClick={(e) => e.target.select()}
                                />
                                <button
                                    type="button"
                                    onClick={handleCopyLink}
                                    className="px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/10 rounded-lg text-white font-semibold transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
                                >
                                    {copied ? (
                                        <>
                                            <FiCheck className="text-green-400" />
                                            <span className="text-green-400">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiCopy />
                                            Copy Link
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-6 flex items-center justify-between gap-4">
                        <button
                            type="button"
                            onClick={handleSkip}
                            disabled={loading}
                            className="text-gray-400 hover:text-white font-medium transition-colors disabled:opacity-50"
                        >
                            Skip this step
                        </button>
                        <div className="flex gap-3">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-white text-black px-8 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                                {loading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin"></div>
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <FiPlus className="text-lg" />
                                        Create Workspace
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default CreateWorkspace;

