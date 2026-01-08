import { motion } from "framer-motion";
import { FiClock, FiUser, FiFlag, FiMoreHorizontal, FiCheckCircle } from "react-icons/fi";

const TaskCard = ({ task, onClick, onStatusChange, viewMode = "grid" }) => {
    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "bg-red-50 text-red-700 border-red-200";
            case "medium":
                return "bg-yellow-50 text-yellow-700 border-yellow-200";
            case "low":
                return "bg-gray-50 text-gray-700 border-gray-200";
            default:
                return "bg-gray-50 text-gray-700 border-gray-200";
        }
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "todo":
                return "bg-slate-50 text-slate-700 border-slate-200";
            case "in_progress":
            case "inprogress":
                return "bg-blue-50 text-blue-700 border-blue-200";
            case "completed":
                return "bg-green-50 text-green-700 border-green-200";
            case "blocked":
                return "bg-red-50 text-red-700 border-red-200";
            default:
                return "bg-slate-50 text-slate-700 border-slate-200";
        }
    };

    const formatStatus = (status) => {
        if (!status) return "To Do";
        return status
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase());
    };

    const handleMarkComplete = (e) => {
        e.stopPropagation();
        const newStatus = task.status === 'completed' ? 'todo' : 'completed';
        if (onStatusChange) {
            onStatusChange(task.id, newStatus);
        }
    };

    const isCompleted = task.status?.toLowerCase() === 'completed';

    // List View Layout
    if (viewMode === "list") {
        return (
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ x: 2 }}
                onClick={onClick}
                className="group bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-purple-300 rounded-xl p-4 cursor-pointer transition-all hover:shadow-md"
            >
                <div className="flex items-center justify-between gap-4">
                    {/* Left side - Task info */}
                    <div className="flex-1 flex items-center gap-3">
                        {/* Task content */}
                        <div className="flex-1 min-w-0">
                            <h3 className="text-slate-900 font-semibold text-sm mb-0.5 truncate group-hover:text-purple-600 transition-colors">
                                {task.title || "Untitled Task"}
                            </h3>
                            {task.description && (
                                <p className="text-slate-500 text-xs truncate">
                                    {task.description}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Middle - Meta info */}
                    <div className="flex items-center gap-3 text-xs">
                        {/* Status */}
                        <div className={`px-2.5 py-1 rounded-md font-medium border whitespace-nowrap ${getStatusClass(task.status)}`}>
                            {formatStatus(task.status)}
                        </div>

                        {/* Priority */}
                        <div className={`px-2.5 py-1 rounded-md font-semibold uppercase border whitespace-nowrap text-[10px] ${getPriorityClass(task.priority)}`}>
                            {task.priority || "Low"}
                        </div>

                        {/* Assigned User */}
                        {task.assignedUser && (
                            <div className="flex items-center gap-1.5 text-slate-600">
                                <FiUser className="text-xs" />
                                <span className="text-xs hidden lg:inline">{task.assignedUser.name || task.assignedUser.email}</span>
                            </div>
                        )}

                        {/* Due Date */}
                        {task.dueDate && (
                            <div className="flex items-center gap-1.5 text-slate-600">
                                <FiClock className="text-xs" />
                                <span className="text-xs hidden xl:inline">
                                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right side - Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleMarkComplete}
                            className={`px-3 py-1.5 rounded-md font-medium text-xs transition-all flex items-center gap-1.5 ${isCompleted
                                ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                                : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                                }`}
                        >
                            <FiCheckCircle className="text-sm" />
                            {isCompleted ? 'Done' : 'Mark Complete'}
                        </button>
                    </div>
                </div>
            </motion.div>
        );
    }

    // Grid View Layout
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -2 }}
            onClick={onClick}
            className="group bg-white/90 backdrop-blur-sm border border-slate-200 hover:border-purple-300 rounded-xl p-4 cursor-pointer transition-all hover:shadow-lg"
        >
            {/* Task Header */}
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-slate-900 font-semibold text-sm flex-1 pr-2 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {task.title || "Untitled Task"}
                </h3>
                <div
                    className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wide border ${getPriorityClass(
                        task.priority
                    )} shrink-0`}
                >
                    {task.priority || "Low"}
                </div>
            </div>

            {/* Task Description */}
            {task.description && (
                <p className="text-slate-500 text-xs mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}

            {/* Task Footer */}
            <div className="space-y-2.5 pt-3 border-t border-slate-100">
                <div className="flex items-center justify-between">
                    {/* Status */}
                    <div
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${getStatusClass(
                            task.status
                        )}`}
                    >
                        {formatStatus(task.status)}
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                        {/* Assigned User */}
                        {task.assignedUser && (
                            <div className="flex items-center gap-1 group/user">
                                <FiUser className="text-xs group-hover/user:text-purple-600 transition-colors" />
                                <span className="hidden sm:inline group-hover/user:text-slate-700 transition-colors">
                                    {task.assignedUser.name || task.assignedUser.email}
                                </span>
                            </div>
                        )}

                        {/* Due Date */}
                        {task.dueDate && (
                            <div className="flex items-center gap-1 group/date">
                                <FiClock className="text-xs group-hover/date:text-purple-600 transition-colors" />
                                <span className="hidden sm:inline group-hover/date:text-slate-700 transition-colors">
                                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Mark Complete Button */}
                <button
                    onClick={handleMarkComplete}
                    className={`w-full py-2 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${isCompleted
                        ? 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
                        : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                        }`}
                >
                    <FiCheckCircle className="text-sm" />
                    {isCompleted ? 'Completed ✓' : 'Mark as Complete'}
                </button>
            </div>
        </motion.div>
    );
};

export default TaskCard;
