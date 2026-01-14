import { motion } from "framer-motion";
import { FiClock, FiUser, FiFlag, FiMoreHorizontal, FiCheckCircle } from "react-icons/fi";

const TaskCard = ({ task, onClick, onStatusChange, viewMode = "grid" }) => {
    const getPriorityClass = (priority) => {
        switch (priority?.toLowerCase()) {
            case "high":
                return "bg-red-500/15 text-red-400 border-red-500/30";
            case "medium":
                return "bg-yellow-500/15 text-yellow-400 border-yellow-500/30";
            case "low":
                return "bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30";
            default:
                return "bg-gray-500/15 text-gray-400 border-gray-500/30";
        }
    };

    const getStatusClass = (status) => {
        switch (status?.toLowerCase()) {
            case "todo":
                return "bg-slate-500/15 text-slate-300 border-slate-500/30";
            case "in_progress":
            case "inprogress":
                return "bg-blue-500/15 text-blue-400 border-blue-500/30";
            case "completed":
                return "bg-[#CCFF00]/15 text-[#CCFF00] border-[#CCFF00]/30";
            case "blocked":
                return "bg-red-500/15 text-red-400 border-red-500/30";
            default:
                return "bg-slate-500/15 text-slate-300 border-slate-500/30";
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

    
    if (viewMode === "list") {
        return (
            <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                whileHover={{ x: 4, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClick}
                className="group bg-[#141517]/80 backdrop-blur-sm border border-white/10 hover:border-[#CCFF00]/50 rounded-xl p-4 cursor-pointer transition-all hover:shadow-xl hover:shadow-[#CCFF00]/10"
            >
                <div className="flex items-center justify-between gap-4">
                    
                    <div className="flex-1 flex items-center gap-3">
                        
                        <div className="flex-1 min-w-0">
                            <h3 className="text-white font-semibold text-sm mb-0.5 truncate group-hover:text-[#CCFF00] transition-colors">
                                {task.title || "Untitled Task"}
                            </h3>
                            {task.description && (
                                <p className="text-gray-400 text-xs truncate">
                                    {task.description}
                                </p>
                            )}
                        </div>
                    </div>

                    
                    <div className="flex items-center gap-3 text-xs">
                        
                        <div className={`px-2.5 py-1 rounded-md font-medium border whitespace-nowrap ${getStatusClass(task.status)}`}>
                            {formatStatus(task.status)}
                        </div>

                        
                        <div className={`px-2.5 py-1 rounded-md font-semibold uppercase border whitespace-nowrap text-[10px] ${getPriorityClass(task.priority)}`}>
                            {task.priority || "Low"}
                        </div>

                        
                        {task.assignedUser && (
                            <div className="flex items-center gap-1.5 text-gray-400">
                                <FiUser className="text-xs" />
                                <span className="text-xs hidden lg:inline">{task.assignedUser.name || task.assignedUser.email}</span>
                            </div>
                        )}

                        
                        {task.dueDate && (
                            <div className="flex items-center gap-1.5 text-gray-400">
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

                    
                    <div className="flex items-center gap-2">
                        <button
                            onClick={handleMarkComplete}
                            className={`px-3 py-1.5 rounded-md font-medium text-xs transition-all flex items-center gap-1.5 ${isCompleted
                                ? 'bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 hover:bg-[#CCFF00]/20'
                                : 'bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20'
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

    
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className="group bg-[#141517]/80 backdrop-blur-sm border border-white/10 hover:border-[#CCFF00]/50 rounded-xl p-4 cursor-pointer transition-all hover:shadow-xl hover:shadow-[#CCFF00]/10"
        >
            
            <div className="flex items-start justify-between mb-3">
                <h3 className="text-white font-semibold text-sm flex-1 pr-2 line-clamp-2 group-hover:text-[#CCFF00] transition-colors">
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

            
            {task.description && (
                <p className="text-gray-400 text-xs mb-3 line-clamp-2">
                    {task.description}
                </p>
            )}

            
            <div className="space-y-2.5 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                    
                    <div
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border ${getStatusClass(
                            task.status
                        )}`}
                    >
                        {formatStatus(task.status)}
                    </div>

                    
                    <div className="flex items-center gap-2 text-gray-400 text-[11px]">
                        
                        {task.assignedUser && (
                            <div className="flex items-center gap-1 group/user">
                                <FiUser className="text-xs group-hover/user:text-[#CCFF00] transition-colors" />
                                <span className="hidden sm:inline group-hover/user:text-gray-200 transition-colors">
                                    {task.assignedUser.name || task.assignedUser.email}
                                </span>
                            </div>
                        )}

                        
                        {task.dueDate && (
                            <div className="flex items-center gap-1 group/date">
                                <FiClock className="text-xs group-hover/date:text-[#CCFF00] transition-colors" />
                                <span className="hidden sm:inline group-hover/date:text-gray-200 transition-colors">
                                    {new Date(task.dueDate).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                    })}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                
                <button
                    onClick={handleMarkComplete}
                    className={`w-full py-2 rounded-lg font-medium text-xs transition-all flex items-center justify-center gap-1.5 ${isCompleted
                        ? 'bg-[#CCFF00]/15 text-[#CCFF00] border border-[#CCFF00]/30 hover:bg-[#CCFF00]/20'
                        : 'bg-blue-500/15 text-blue-400 border border-blue-500/30 hover:bg-blue-500/20'
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
