import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiGrid, FiList, FiUsers } from "react-icons/fi";
import { useWorkspace } from "../context/WorkspaceContext";
import { createTask } from "../api/taskApi";
import TaskList from "../components/tasks/TaskList";
import CreateTaskModal from "../components/tasks/CreateTaskModal";

const TeamHome = () => {
    const { currentWorkspace, tasks, taskLoading, refreshTasks } = useWorkspace();
    const [createLoading, setCreateLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterAssignee, setFilterAssignee] = useState("all");

    // Handle create task
    const handleCreateTask = async (taskData) => {
        if (!currentWorkspace) {
            alert("Please select a workspace first");
            return;
        }

        try {
            setCreateLoading(true);
            await createTask(currentWorkspace.id, taskData);
            await refreshTasks(); // Refresh tasks from context
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to create task:", error);
            alert(error.response?.data?.message || "Failed to create task");
        } finally {
            setCreateLoading(false);
        }
    };

    // Filter tasks
    const filteredTasks = tasks.filter((task) => {
        const statusMatch =
            filterStatus === "all" ||
            task.status?.toLowerCase() === filterStatus.toLowerCase();
        const assigneeMatch =
            filterAssignee === "all" || task.assignedUser?.id === filterAssignee;
        return statusMatch && assigneeMatch;
    });

    // Get unique assignees for filter
    const assignees = tasks.reduce((acc, task) => {
        if (task.assignedUser && !acc.find((a) => a.id === task.assignedUser.id)) {
            acc.push(task.assignedUser);
        }
        return acc;
    }, []);

    return (
        <div className="min-h-full animate-fade-in">
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
                            <FiUsers className="text-purple-600 text-xl" />
                            Team Tasks
                            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                                {filteredTasks.length} task{filteredTasks.length !== 1 ? "s" : ""}
                            </span>
                        </h1>
                        <p className="text-slate-600 text-sm">
                            View and manage all tasks assigned to your team in{" "}
                            <span className="text-purple-600 font-medium">
                                {currentWorkspace?.name || "this workspace"}
                            </span>
                        </p>
                    </div>

                    {/* Create Task Button */}
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg font-medium text-slate-700 hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
                    >
                        <FiPlus className="text-base" />
                        New Task
                    </motion.button>
                </div>
            </div>

            {/* Toolbar */}
            <div className="flex items-center justify-between mb-5 flex-wrap gap-3">
                {/* Filters */}
                <div className="flex items-center gap-2 flex-wrap">
                    {/* Status Filter */}
                    <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                        <button
                            onClick={() => setFilterStatus("all")}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterStatus === "all"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            All Status
                        </button>
                        <button
                            onClick={() => setFilterStatus("todo")}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterStatus === "todo"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            To Do
                        </button>
                        <button
                            onClick={() => setFilterStatus("in_progress")}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterStatus === "in_progress"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            In Progress
                        </button>
                        <button
                            onClick={() => setFilterStatus("completed")}
                            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterStatus === "completed"
                                ? "bg-purple-600 text-white shadow-sm"
                                : "text-slate-600 hover:bg-slate-50"
                                }`}
                        >
                            Completed
                        </button>
                    </div>

                    {/* Assignee Filter */}
                    {assignees.length > 0 && (
                        <select
                            value={filterAssignee}
                            onChange={(e) => setFilterAssignee(e.target.value)}
                            className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all shadow-sm"
                        >
                            <option value="all" className="bg-white">
                                All Members
                            </option>
                            {assignees.map((assignee) => (
                                <option
                                    key={assignee.id}
                                    value={assignee.id}
                                    className="bg-white"
                                >
                                    {assignee.name || assignee.email}
                                </option>
                            ))}
                        </select>
                    )}
                </div>

                {/* View Mode Toggle */}
                <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 rounded-md transition-all ${viewMode === "list"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-50"
                            }`}
                        title="List View"
                    >
                        <FiList className="text-base" />
                    </button>
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 rounded-md transition-all ${viewMode === "grid"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-slate-500 hover:bg-slate-50"
                            }`}
                        title="Grid View"
                    >
                        <FiGrid className="text-base" />
                    </button>
                </div>
            </div>

            {/* Task Statistics */}
            <div className="grid grid-cols-4 gap-3 mb-5">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl p-3.5 hover:shadow-md transition-all"
                >
                    <p className="text-slate-500 text-[11px] font-medium mb-0.5 uppercase tracking-wide">Total Tasks</p>
                    <p className="text-2xl font-bold text-slate-900">{tasks.length}</p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-slate-50 to-slate-100/50 border border-slate-200 rounded-xl p-3.5 hover:shadow-md transition-all"
                >
                    <p className="text-slate-600 text-[11px] font-medium mb-0.5 uppercase tracking-wide">To Do</p>
                    <p className="text-2xl font-bold text-slate-800">
                        {tasks.filter((t) => t.status?.toLowerCase() === "todo").length}
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200 rounded-xl p-3.5 hover:shadow-md transition-all"
                >
                    <p className="text-blue-700 text-[11px] font-medium mb-0.5 uppercase tracking-wide">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">
                        {
                            tasks.filter(
                                (t) =>
                                    t.status?.toLowerCase() === "in_progress" ||
                                    t.status?.toLowerCase() === "inprogress"
                            ).length
                        }
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gradient-to-br from-green-50 to-green-100/50 border border-green-200 rounded-xl p-3.5 hover:shadow-md transition-all"
                >
                    <p className="text-green-700 text-[11px] font-medium mb-0.5 uppercase tracking-wide">Completed</p>
                    <p className="text-2xl font-bold text-green-600">
                        {tasks.filter((t) => t.status?.toLowerCase() === "completed").length}
                    </p>
                </motion.div>
            </div>

            {/* Tasks Section */}
            {taskLoading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-purple-200 border-t-purple-600"></div>
                </div>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    emptyMessage="No team tasks found in this workspace"
                    onTaskClick={(task) => console.log("Task clicked:", task)}
                    viewMode={viewMode}
                />
            )}

            {/* Create Task Modal */}
            <CreateTaskModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleCreateTask}
                loading={createLoading}
            />
        </div>
    );
};

export default TeamHome;
