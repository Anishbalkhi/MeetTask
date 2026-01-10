import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";

const TaskList = ({ tasks, onTaskClick, emptyMessage = "No tasks found", viewMode = "grid" }) => {
    if (!tasks || tasks.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-20 px-4">
                <div className="w-24 h-24 mb-6 rounded-full bg-gradient-to-br from-[#CCFF00]/20 to-[#b3e600]/20 flex items-center justify-center">
                    <svg
                        className="w-12 h-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <p className="text-gray-300 text-lg font-medium">{emptyMessage}</p>
                <p className="text-gray-500 text-sm mt-2">
                    Create your first task to get started
                </p>
            </div>
        );
    }

    // Grid view (blocks)
    if (viewMode === "grid") {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <AnimatePresence mode="popLayout">
                    {tasks.map((task) => (
                        <TaskCard
                            key={task.id}
                            task={task}
                            onClick={() => onTaskClick && onTaskClick(task)}
                            viewMode="grid"
                        />
                    ))}
                </AnimatePresence>
            </div>
        );
    }

    // List view
    return (
        <div className="flex flex-col gap-2">
            <AnimatePresence mode="popLayout">
                {tasks.map((task) => (
                    <TaskCard
                        key={task.id}
                        task={task}
                        onClick={() => onTaskClick && onTaskClick(task)}
                        viewMode="list"
                    />
                ))}
            </AnimatePresence>
        </div>
    );
};

export default TaskList;

