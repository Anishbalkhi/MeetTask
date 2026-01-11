import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Users, Calendar, Flag, Search } from "lucide-react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { getWorkspaceMembers } from "../../api/workspaceApi";
import { useAuth } from "../../context/AuthContext";

const CreateTaskModal = ({ isOpen, onClose, onSubmit, loading = false }) => {
    const { currentWorkspace } = useWorkspace();
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        assignees: [],
    });

    const [assigneeInput, setAssigneeInput] = useState("");
    const [showDescription, setShowDescription] = useState(false);
    const [showAssigneeDropdown, setShowAssigneeDropdown] = useState(false);
    const [teamMembers, setTeamMembers] = useState([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    // Fetch team members when modal opens
    useEffect(() => {
        if (isOpen && currentWorkspace) {
            fetchTeamMembers();
        }
    }, [isOpen, currentWorkspace]);

    const fetchTeamMembers = async () => {
        try {
            setLoadingMembers(true);
            const res = await getWorkspaceMembers(currentWorkspace.id);
            const members = res.data || [];

            // Add current user at the top
            const formattedMembers = members.map(member => ({
                id: member.id || member._id,
                name: member.name || member.email,
                email: member.email,
                isCurrentUser: member.email === user?.email
            }));

            // Sort to put current user first
            formattedMembers.sort((a, b) => b.isCurrentUser - a.isCurrentUser);

            setTeamMembers(formattedMembers);
        } catch (error) {
            console.error("Failed to fetch team members:", error);
            setTeamMembers([]);
        } finally {
            setLoadingMembers(false);
        }
    };

    const filteredMembers = teamMembers.filter(member =>
        member.name.toLowerCase().includes(assigneeInput.toLowerCase()) ||
        member.email.toLowerCase().includes(assigneeInput.toLowerCase())
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAssignee = (memberEmail) => {
        const email = memberEmail || assigneeInput.trim();
        if (email && !formData.assignees.includes(email)) {
            setFormData((prev) => ({
                ...prev,
                assignees: [...prev.assignees, email]
            }));
            setAssigneeInput("");
            setShowAssigneeDropdown(false);
        }
    };

    const handleRemoveAssignee = (email) => {
        setFormData((prev) => ({
            ...prev,
            assignees: prev.assignees.filter(a => a !== email)
        }));
    };

    const handleAssigneeKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddAssignee();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        // Reset form
        setFormData({
            title: "",
            description: "",
            priority: "medium",
            status: "todo",
            dueDate: "",
            assignees: [],
        });
        setAssigneeInput("");
        setShowDescription(false);
    };

    const statusOptions = [
        { value: "todo", label: "TO DO" },
        { value: "in_progress", label: "IN PROGRESS" },
        { value: "completed", label: "COMPLETED" },
    ];

    const priorityOptions = [
        { value: "high", label: "High", color: "text-red-600" },
        { value: "medium", label: "Medium", color: "text-yellow-600" },
        { value: "low", label: "Low", color: "text-gray-600" },
    ];

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                        >
                            {/* Header */}
                            <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                                <h2 className="text-lg font-semibold text-gray-900">Create Task</h2>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 hover:bg-gray-100 rounded transition-colors text-gray-500 hover:text-gray-900"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                <form onSubmit={handleSubmit} className="space-y-5">
                                    {/* Task Name */}
                                    <div>
                                        <input
                                            type="text"
                                            name="title"
                                            value={formData.title}
                                            onChange={handleChange}
                                            required
                                            placeholder="Task Name"
                                            className="w-full text-xl font-semibold text-gray-900 placeholder-gray-400 focus:outline-none bg-transparent border-b border-transparent hover:border-gray-200 focus:border-gray-300 pb-2 transition-colors"
                                            autoFocus
                                        />
                                    </div>

                                    {/* Description */}
                                    {!showDescription ? (
                                        <button
                                            type="button"
                                            onClick={() => setShowDescription(true)}
                                            className="flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm"
                                        >
                                            <span>📄</span>
                                            <span>Add description</span>
                                        </button>
                                    ) : (
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            rows={3}
                                            placeholder="Add a description..."
                                            className="w-full px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none bg-gray-50 rounded border border-gray-200 focus:border-gray-300 resize-none transition-colors"
                                        />
                                    )}

                                    {/* Quick Actions */}
                                    <div className="space-y-3">
                                        {/* Status */}
                                        <div className="flex items-center gap-3">
                                            <label className="w-24 text-sm font-medium text-gray-600 flex items-center gap-2">
                                                Status
                                            </label>
                                            <select
                                                name="status"
                                                value={formData.status}
                                                onChange={handleChange}
                                                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                                            >
                                                {statusOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Priority */}
                                        <div className="flex items-center gap-3">
                                            <label className="w-24 text-sm font-medium text-gray-600 flex items-center gap-2">
                                                <Flag className="w-4 h-4" />
                                                Priority
                                            </label>
                                            <select
                                                name="priority"
                                                value={formData.priority}
                                                onChange={handleChange}
                                                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                                            >
                                                {priorityOptions.map((option) => (
                                                    <option key={option.value} value={option.value}>
                                                        {option.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        {/* Due Date */}
                                        <div className="flex items-center gap-3">
                                            <label className="w-24 text-sm font-medium text-gray-600 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" />
                                                Due date
                                            </label>
                                            <input
                                                type="date"
                                                name="dueDate"
                                                value={formData.dueDate}
                                                onChange={handleChange}
                                                className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors cursor-pointer"
                                            />
                                        </div>

                                        {/* Assignees */}
                                        <div className="flex items-start gap-3">
                                            <label className="w-24 text-sm font-medium text-gray-600 flex items-center gap-2 pt-2">
                                                <Users className="w-4 h-4" />
                                                Assignee
                                            </label>
                                            <div className="flex-1 space-y-2 relative">
                                                <div className="relative">
                                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <input
                                                        type="text"
                                                        value={assigneeInput}
                                                        onChange={(e) => {
                                                            setAssigneeInput(e.target.value);
                                                            setShowAssigneeDropdown(true);
                                                        }}
                                                        onFocus={() => setShowAssigneeDropdown(true)}
                                                        onBlur={() => setTimeout(() => setShowAssigneeDropdown(false), 200)}
                                                        onKeyPress={handleAssigneeKeyPress}
                                                        placeholder="Search or enter email..."
                                                        className="w-full pl-9 pr-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors"
                                                    />

                                                    {/* Dropdown */}
                                                    {showAssigneeDropdown && (assigneeInput.trim() !== '' || filteredMembers.length > 0) && (
                                                        <motion.div
                                                            initial={{ opacity: 0, y: -10 }}
                                                            animate={{ opacity: 1, y: 0 }}
                                                            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto"
                                                        >
                                                            {filteredMembers.length > 0 ? (
                                                                filteredMembers.map((member) => (
                                                                    <button
                                                                        key={member.id}
                                                                        type="button"
                                                                        onClick={() => handleAddAssignee(member.email)}
                                                                        disabled={formData.assignees.includes(member.email)}
                                                                        className="w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-medium ${member.isCurrentUser ? 'bg-gray-900' : 'bg-blue-500'
                                                                            }`}>
                                                                            {member.isCurrentUser ? 'ME' : member.name.substring(0, 2).toUpperCase()}
                                                                        </div>
                                                                        <div className="flex-1 min-w-0">
                                                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                                                {member.name}
                                                                            </p>
                                                                            {member.name !== member.email && (
                                                                                <p className="text-xs text-gray-500 truncate">
                                                                                    {member.email}
                                                                                </p>
                                                                            )}
                                                                        </div>
                                                                        {formData.assignees.includes(member.email) && (
                                                                            <div className="text-green-600">
                                                                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                                                </svg>
                                                                            </div>
                                                                        )}
                                                                    </button>
                                                                ))
                                                            ) : assigneeInput.trim() !== '' ? (
                                                                <div className="px-3 py-3 text-center text-sm text-gray-500">
                                                                    No members found. Press Enter to add "{assigneeInput}" as email.
                                                                </div>
                                                            ) : null}
                                                        </motion.div>
                                                    )}
                                                </div>

                                                {/* Assignee List */}
                                                {formData.assignees.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {formData.assignees.map((email, index) => {
                                                            const member = teamMembers.find(m => m.email === email);
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 rounded text-sm"
                                                                >
                                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-medium ${member?.isCurrentUser ? 'bg-gray-900' : 'bg-blue-500'
                                                                        }`}>
                                                                        {member?.isCurrentUser ? 'ME' : (member?.name || email).substring(0, 2).toUpperCase()}
                                                                    </div>
                                                                    <span className="text-gray-700">{member?.name || email}</span>
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveAssignee(email)}
                                                                        className="text-gray-400 hover:text-red-600 transition-colors"
                                                                    >
                                                                        <X className="w-4 h-4" />
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Footer */}
                            <div className="border-t border-gray-200 px-6 py-4 flex items-center justify-end gap-3 bg-gray-50">
                                <button
                                    type="button"
                                    onClick={onClose}
                                    className="px-6 py-2 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    disabled={loading || !formData.title.trim()}
                                    className="px-6 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Creating...
                                        </>
                                    ) : (
                                        "Create Task"
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CreateTaskModal;
