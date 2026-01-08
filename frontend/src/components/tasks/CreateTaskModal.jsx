import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiUser } from "react-icons/fi";

const CreateTaskModal = ({ isOpen, onClose, onSubmit, loading = false }) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "medium",
        status: "todo",
        dueDate: "",
        assignees: [], // Array of user IDs or emails
    });
    const [assigneeInput, setAssigneeInput] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddAssignee = () => {
        const email = assigneeInput.trim();
        if (email && !formData.assignees.includes(email)) {
            setFormData((prev) => ({
                ...prev,
                assignees: [...prev.assignees, email]
            }));
            setAssigneeInput("");
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
    };

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
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                        onClick={onClose}
                    >
                        <div
                            onClick={(e) => e.stopPropagation()}
                            className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-lg p-6"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-slate-900">Create New Task</h2>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-600 hover:text-slate-900"
                                >
                                    <FiX className="text-xl" />
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Title */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Task Title *
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleChange}
                                        required
                                        placeholder="Enter task title..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        rows={3}
                                        placeholder="Add a description..."
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                                    />
                                </div>

                                {/* Priority & Status */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Priority
                                        </label>
                                        <select
                                            name="priority"
                                            value={formData.priority}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        >
                                            <option value="low" className="bg-white">Low</option>
                                            <option value="medium" className="bg-white">Medium</option>
                                            <option value="high" className="bg-white">High</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Status
                                        </label>
                                        <select
                                            name="status"
                                            value={formData.status}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                        >
                                            <option value="todo" className="bg-white">To Do</option>
                                            <option value="in_progress" className="bg-white">In Progress</option>
                                            <option value="completed" className="bg-white">Completed</option>
                                            <option value="blocked" className="bg-white">Blocked</option>
                                        </select>
                                    </div>
                                </div>

                                {/* Assign To */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                                        <FiUser className="text-sm" />
                                        Assign To (Optional)
                                    </label>
                                    <div className="space-y-2">
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={assigneeInput}
                                                onChange={(e) => setAssigneeInput(e.target.value)}
                                                onKeyPress={handleAssigneeKeyPress}
                                                placeholder="Enter email and press Enter..."
                                                className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                            />
                                            <button
                                                type="button"
                                                onClick={handleAddAssignee}
                                                className="px-4 py-3 bg-purple-50 hover:bg-purple-100 border border-purple-200 rounded-lg text-purple-700 font-semibold transition-all"
                                            >
                                                Add
                                            </button>
                                        </div>
                                        {/* Assignee Tags */}
                                        {formData.assignees.length > 0 && (
                                            <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-lg border border-slate-200">
                                                {formData.assignees.map((email, index) => (
                                                    <div
                                                        key={index}
                                                        className="flex items-center gap-2 px-3 py-1.5 bg-white border border-purple-200 rounded-lg text-sm"
                                                    >
                                                        <FiUser className="text-purple-600 text-xs" />
                                                        <span className="text-slate-700">{email}</span>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveAssignee(email)}
                                                            className="text-slate-400 hover:text-red-600 transition-colors"
                                                        >
                                                            <FiX className="text-base" />
                                                        </button>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Due Date */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Due Date
                                    </label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        value={formData.dueDate}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                                    />
                                </div>

                                {/* Actions */}
                                <div className="flex gap-3 pt-4">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-lg font-semibold text-slate-700 transition-all"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`flex-1 px-4 py-3 rounded-lg border-gray-700 border-2 font-semibold text-gray-700 transition-all 
                                            ${loading
                                                ? "bg-gray-600 cursor-not-allowed"
                                                : "bg-meettask-accent hover:scale-105"
                                            }`}
                                    >
                                        {loading ? "Creating..." : "Create Task"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CreateTaskModal;
