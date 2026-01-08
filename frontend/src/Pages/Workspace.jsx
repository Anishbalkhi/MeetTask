import { useState, useEffect } from "react";
import { FiLink, FiCopy, FiUsers, FiMail, FiSettings, FiTrash2, FiUserX, FiShield, FiCheck } from "react-icons/fi";
import { useWorkspace } from "../context/WorkspaceContext";
import { getWorkspaceMembers } from "../api/workspaceApi";
import { useNavigate } from "react-router-dom";

const WorkspaceSettings = () => {
    const { currentWorkspace } = useWorkspace();
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [copied, setCopied] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (currentWorkspace) {
            fetchMembers();
        }
    }, [currentWorkspace]);

    const fetchMembers = async () => {
        try {
            setLoadingMembers(true);
            const res = await getWorkspaceMembers(currentWorkspace.id);
            setMembers(res.data || []);
        } catch (error) {
            console.error("Failed to fetch members", error);
        } finally {
            setLoadingMembers(false);
        }
    };

    const handleDeleteWorkspace = async () => {
        if (!showDeleteConfirm) {
            setShowDeleteConfirm(true);
            return;
        }
        // Mock delete - implement actual API call
        alert("Workspace deleted! (Mock)");
        navigate("/dashboard/home");
    };

    const handleRemoveMember = async (memberId) => {
        // Mock remove - implement actual API call
        alert(`Member removed! (Mock)`);
        fetchMembers();
    };

    const handleChangeRole = async (memberId, newRole) => {
        // Mock role change - implement actual API call
        alert(`Role changed to ${newRole}! (Mock)`);
        fetchMembers();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://meettask.com/join/${currentWorkspace?.id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!currentWorkspace) return <div className="p-10 text-gray-500">Select a workspace first.</div>;

    return (
        <div className="max-w-6xl mx-auto pt-6 pb-20 animate-fade-in-up px-4">

            <div className="flex items-center gap-6 mb-10 border-b border-white/5 pb-8">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white text-3xl font-bold shadow-[0_0_30px_rgba(59,130,246,0.3)] border border-white/10">
                    {currentWorkspace.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                    <h1 className="text-4xl font-bold text-white mb-2 tracking-tight">Workspace Settings</h1>
                    <p className="text-gray-400 text-lg">Manage <span className="text-blue-400 font-medium">{currentWorkspace.name}</span></p>
                </div>
            </div>

            <div className="grid gap-8">

                {/* Section 1: Share Link & Members */}
                <div className="grid lg:grid-cols-2 gap-8">
                    {/* Invite Link Section */}
                    <div className="bg-[#121315]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 to-purple-500/5 opacity-50 pointer-events-none"></div>

                        <div className="flex items-center gap-3 mb-8 relative z-10">
                            <div className="p-3 rounded-xl bg-black/40 border border-white/5 text-blue-400 shadow-inner">
                                <FiLink className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-gray-100">Invite Link</h3>
                                <p className="text-gray-500 text-sm">Share this link to invite members</p>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">
                                Workspace Invite Link
                            </label>
                            <div className="flex gap-2 group/link">
                                <div className="flex-1 bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-gray-400 text-sm truncate flex items-center gap-2 font-mono hover:text-gray-300 transition-colors cursor-copy" onClick={handleCopyLink}>
                                    <FiLink className="flex-shrink-0" />
                                    <span className="truncate">https://meettask.com/join/{currentWorkspace.id}</span>
                                </div>
                                <button
                                    onClick={handleCopyLink}
                                    className="bg-black/40 hover:bg-black/60 text-gray-400 hover:text-white px-4 py-3 rounded-xl transition-colors border border-white/10 flex items-center gap-2"
                                >
                                    {copied ? (
                                        <>
                                            <FiCheck className="text-green-400" />
                                            <span className="text-green-400 text-sm font-medium">Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <FiCopy />
                                            <span className="text-sm font-medium">Copy</span>
                                        </>
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-3">Anyone with this link can join your workspace</p>
                        </div>
                    </div>

                    {/* Members List */}
                    <div className="bg-[#121315]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-8 shadow-2xl h-full flex flex-col relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-bl from-blue-500/5 to-transparent opacity-30 pointer-events-none"></div>
                        <h3 className="text-xl font-bold text-gray-100 mb-6 relative z-10 flex items-center justify-between">
                            Current Members
                            <span className="text-xs font-normal text-gray-500 bg-white/5 px-2 py-1 rounded-lg border border-white/5">{members.length} Active</span>
                        </h3>

                        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar relative z-10 space-y-3">
                            {loadingMembers ? (
                                <div className="text-gray-500 animate-pulse text-sm">Loading members...</div>
                            ) : (
                                <>
                                    {members.length > 0 ? members.map((member, i) => (
                                        <div key={i} className="flex items-center gap-4 p-3 bg-white/5 border border-white/5 hover:border-white/10 rounded-xl transition-all group">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-white font-bold text-sm border border-white/10">
                                                {member.email[0].toUpperCase()}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-gray-200 font-medium text-sm group-hover:text-white transition-colors">{member.email}</p>
                                                <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Member</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveMember(member.id)}
                                                className="ml-auto text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-2 bg-black/20 rounded-lg"
                                                title="Remove member"
                                            >
                                                <FiUserX />
                                            </button>
                                        </div>
                                    )) : (
                                        <div className="text-gray-500 italic text-sm py-4 text-center border-2 border-dashed border-white/5 rounded-xl">No members found via API.</div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Section 2: Danger Zone - Delete Workspace */}
                <div className="bg-[#121315]/80 backdrop-blur-xl border border-red-500/20 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-tr from-red-500/10 to-transparent opacity-30 pointer-events-none"></div>

                    <div className="flex items-center gap-3 mb-6 relative z-10">
                        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 shadow-inner">
                            <FiTrash2 className="text-2xl" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-red-400">Danger Zone</h3>
                            <p className="text-gray-500 text-sm">Irreversible actions</p>
                        </div>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between p-6 bg-black/20 border border-red-500/10 rounded-2xl">
                            <div>
                                <h4 className="text-white font-bold mb-1">Delete Workspace</h4>
                                <p className="text-gray-400 text-sm">Once deleted, all data will be permanently removed. This action cannot be undone.</p>
                            </div>
                            <button
                                onClick={handleDeleteWorkspace}
                                className={`px-6 py-3 rounded-xl font-bold transition-all ${showDeleteConfirm
                                    ? 'bg-red-600 hover:bg-red-700 text-white'
                                    : 'bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30'
                                    }`}
                            >
                                {showDeleteConfirm ? 'Confirm Delete?' : 'Delete Workspace'}
                            </button>
                        </div>
                        {showDeleteConfirm && (
                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
};

export default WorkspaceSettings;

