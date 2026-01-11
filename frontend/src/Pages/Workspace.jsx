import { useState, useEffect } from "react";
import { Link2, Copy, Users, Trash2, X, Check, Settings as SettingsIcon, Mail } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { getWorkspaceMembers } from "../api/workspaceApi";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const WorkspaceSettings = () => {
    const { currentWorkspace } = useWorkspace();
    const [members, setMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [copied, setCopied] = useState(false);
    const [activeTab, setActiveTab] = useState("general");
    const navigate = useNavigate();

    useEffect(() => {
        if (currentWorkspace) {
            fetchMembers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
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
        alert("Workspace deleted! (Mock)");
        navigate("/dashboard");
    };

    // eslint-disable-next-line no-unused-vars
    const handleRemoveMember = async (_memberId) => {
        alert(`Member removed! (Mock)`);
        fetchMembers();
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(`https://meettask.com/join/${currentWorkspace?.id}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (!currentWorkspace) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center bg-white border border-gray-200 rounded-lg p-12 shadow-sm">
                    <SettingsIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-600">Select a workspace first.</p>
                </div>
            </div>
        );
    }

    const tabs = [
        { id: "general", label: "General", icon: SettingsIcon },
        { id: "members", label: "Members", icon: Users },
        { id: "invite", label: "Invite", icon: Mail },
    ];

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="max-w-5xl mx-auto p-6">

                {/* Page Header */}
                <motion.div
                    className="mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Workspace Settings</h1>
                    <p className="text-gray-600">Manage your workspace and team</p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    className="border-b border-gray-200 mb-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="flex gap-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-4 px-1 border-b-2 font-medium transition-colors flex items-center gap-2 ${activeTab === tab.id
                                    ? "border-gray-900 text-gray-900"
                                    : "border-transparent text-gray-500 hover:text-gray-900"
                                    }`}
                            >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </motion.div>

                {/* Tab Content */}
                <div className="space-y-6">

                    {/* General Tab */}
                    {activeTab === "general" && (
                        <motion.div
                            className="space-y-6"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            {/* Workspace Info Card */}
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Workspace Information</h2>

                                <form onSubmit={(e) => { e.preventDefault(); alert("Workspace updated!"); }} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Workspace Name
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={currentWorkspace.name}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                            placeholder="Enter workspace name"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">This is how your workspace will appear to team members</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Description
                                        </label>
                                        <textarea
                                            rows="3"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                            placeholder="Describe what this workspace is for..."
                                        />
                                        <p className="text-xs text-gray-500 mt-1">Optional description for your workspace</p>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Workspace ID
                                        </label>
                                        <input
                                            type="text"
                                            value={currentWorkspace.id}
                                            readOnly
                                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-600 font-mono text-sm focus:outline-none cursor-not-allowed"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">This ID cannot be changed</p>
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button
                                            type="submit"
                                            className="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors magnetic-hover"
                                        >
                                            Save Changes
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Danger Zone */}
                            <div className="bg-white border border-red-200 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-red-600 mb-4">Danger Zone</h2>

                                <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-900 mb-1">Delete Workspace</p>
                                            <p className="text-sm text-gray-600">
                                                Once deleted, all data will be permanently removed. This action cannot be undone.
                                            </p>
                                        </div>
                                        <button
                                            onClick={handleDeleteWorkspace}
                                            className={`px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap ${showDeleteConfirm
                                                ? "bg-red-600 text-white hover:bg-red-700"
                                                : "bg-white text-red-600 border border-red-300 hover:bg-red-50"
                                                }`}
                                        >
                                            {showDeleteConfirm ? "Confirm Delete?" : "Delete Workspace"}
                                        </button>
                                    </div>

                                    {showDeleteConfirm && (
                                        <div className="mt-4 flex gap-2 justify-end">
                                            <button
                                                onClick={() => setShowDeleteConfirm(false)}
                                                className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Members Tab */}
                    {activeTab === "members" && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <div className="flex items-center justify-between mb-6">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-900">Team Members</h2>
                                        <p className="text-sm text-gray-600 mt-1">{members.length} members in this workspace</p>
                                    </div>
                                </div>

                                {loadingMembers ? (
                                    <div className="text-center py-12">
                                        <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-gray-900 mx-auto"></div>
                                        <p className="text-gray-500 mt-3">Loading members...</p>
                                    </div>
                                ) : (
                                    <div className="space-y-2">
                                        {members.length > 0 ? (
                                            members.map((member, i) => (
                                                <motion.div
                                                    key={i}
                                                    className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors group"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: i * 0.05 }}
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-white font-semibold">
                                                            {member.email[0].toUpperCase()}
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{member.email}</p>
                                                            <p className="text-xs text-gray-500">Member</p>
                                                        </div>
                                                    </div>
                                                    <button
                                                        onClick={() => handleRemoveMember(member.id)}
                                                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                                                        title="Remove member"
                                                    >
                                                        <X className="w-5 h-5" />
                                                    </button>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                                                <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                                                <p className="text-gray-500">No members found</p>
                                                <p className="text-sm text-gray-400 mt-1">Invite team members to get started</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}

                    {/* Invite Tab */}
                    {activeTab === "invite" && (
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                        >
                            <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Invite Team Members</h2>

                                <p className="text-gray-600 mb-6">
                                    Share this link to invite members to your workspace
                                </p>

                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-center gap-3">
                                        <Link2 className="w-5 h-5 text-gray-500 flex-shrink-0" />
                                        <input
                                            type="text"
                                            value={`https://meettask.com/join/${currentWorkspace.id}`}
                                            readOnly
                                            className="flex-1 bg-transparent text-gray-700 font-mono text-sm focus:outline-none"
                                            onClick={(e) => e.target.select()}
                                        />
                                        <button
                                            onClick={handleCopyLink}
                                            className="px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors flex items-center gap-2 whitespace-nowrap"
                                        >
                                            {copied ? (
                                                <>
                                                    <Check className="w-4 h-4" />
                                                    Copied
                                                </>
                                            ) : (
                                                <>
                                                    <Copy className="w-4 h-4" />
                                                    Copy Link
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <p className="text-sm text-gray-500 mt-4">
                                    Anyone with this link can join your workspace
                                </p>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default WorkspaceSettings;
