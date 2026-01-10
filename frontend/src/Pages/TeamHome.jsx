import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, List, Grid3x3, Filter, Search, MoreHorizontal, Circle, Users as UsersIcon } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";
import { createTask } from "../api/taskApi";
import CreateTaskModal from "../components/tasks/CreateTaskModal";

const TeamHome = () => {
    const { currentWorkspace, tasks, taskLoading, refreshTasks } = useWorkspace();
    const [createLoading, setCreateLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState("list");
    const [filterStatus, setFilterStatus] = useState("all");
    const [filterAssignee, setFilterAssignee] = useState("all");

    const handleCreateTask = async (taskData) => {
        if (!currentWorkspace) {
            alert("Please select a workspace first");
            return;
        }

        try {
            setCreateLoading(true);
            await createTask(currentWorkspace.id, taskData);
            await refreshTasks();
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to create task:", error);
            alert(error.response?.data?.message || "Failed to create task");
        } finally {
            setCreateLoading(false);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const statusMatch = filterStatus === "all" || task.status?.toLowerCase() === filterStatus.toLowerCase();
        const assigneeMatch = filterAssignee === "all" || task.assignedUser?.id === filterAssignee;
        return statusMatch && assigneeMatch;
    });

    const assignees = tasks.reduce((acc, task) => {
        if (task.assignedUser && !acc.find((a) => a.id === task.assignedUser.id)) {
            acc.push(task.assignedUser);
        }
        return acc;
    }, []);

    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'completed': return 'bg-green-100 text-green-700 border-green-200';
            case 'inprogress':
            case 'in_progress': return 'bg-blue-100 text-blue-700 border-blue-200';
            case 'todo': return 'bg-gray-100 text-gray-700 border-gray-200';
            default: return 'bg-gray-100 text-gray-700 border-gray-200';
        }
    };

    const getPriorityColor = (priority) => {
        switch (priority?.toLowerCase()) {
            case 'high': return 'text-red-600';
            case 'medium': return 'text-yellow-600';
            case 'low': return 'text-gray-400';
            default: return 'text-gray-400';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="p-6">
                {/* Page Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <UsersIcon className="w-6 h-6" />
                                Team Tasks
                            </h1>
                            <p className="text-sm text-gray-500 mt-1">
                                Collaborate on tasks in {currentWorkspace?.name || "this workspace"}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Task
                        </button>
                    </div>

                    {/* Toolbar */}
                    <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-3">
                        <div className="flex items-center gap-2">
                            {/* View Toggle */}
                            <div className="flex items-center gap-1 bg-gray-100 rounded p-0.5">
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-1.5 rounded transition-colors ${viewMode === "list" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    <List className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-1.5 rounded transition-colors ${viewMode === "grid" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    <Grid3x3 className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Filters */}
                            <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded flex items-center gap-2 transition-colors">
                                <Filter className="w-4 h-4" />
                                Filter
                            </button>

                            {/* Status Filter */}
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value)}
                                className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 focus:outline-none focus:border-gray-300 transition-colors"
                            >
                                <option value="all">All Status</option>
                                <option value="todo">To Do</option>
                                <option value="inprogress">In Progress</option>
                                <option value="completed">Completed</option>
                            </select>

                            {/* Assignee Filter */}
                            {assignees.length > 0 && (
                                <select
                                    value={filterAssignee}
                                    onChange={(e) => setFilterAssignee(e.target.value)}
                                    className="px-3 py-1.5 text-sm text-gray-700 bg-white border border-gray-200 rounded hover:bg-gray-50 focus:outline-none focus:border-gray-300 transition-colors"
                                >
                                    <option value="all">All Members</option>
                                    {assignees.map((assignee) => (
                                        <option key={assignee.id} value={assignee.id}>
                                            {assignee.name || assignee.email}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                            <input
                                type="text"
                                placeholder="Search tasks..."
                                className="pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded focus:outline-none focus:border-gray-300 focus:bg-white transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Tasks Table */}
                {taskLoading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-gray-200 border-t-gray-900"></div>
                    </div>
                ) : filteredTasks.length === 0 ? (
                    <div className="bg-white border border-gray-200 rounded-lg p-12 text-center">
                        <p className="text-gray-500 mb-4">No team tasks found</p>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create your first task
                        </button>
                    </div>
                ) : (
                    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase">
                            <div className="col-span-5">Task Name</div>
                            <div className="col-span-2">Assignee</div>
                            <div className="col-span-2">Status</div>
                            <div className="col-span-1">Priority</div>
                            <div className="col-span-1">Due Date</div>
                            <div className="col-span-1"></div>
                        </div>

                        {/* Table Rows */}
                        <div>
                            {filteredTasks.map((task, index) => (
                                <motion.div
                                    key={task.id || index}
                                    className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {/* Task Name */}
                                    <div className="col-span-5 flex items-center gap-3">
                                        <button className="text-gray-300 hover:text-gray-900 transition-colors">
                                            <Circle className="w-4 h-4" />
                                        </button>
                                        <span className="text-sm text-gray-900 font-medium line-clamp-1">
                                            {task.title || task.name || "Untitled Task"}
                                        </span>
                                    </div>

                                    {/* Assignee */}
                                    <div className="col-span-2 flex items-center">
                                        {task.assignedUser ? (
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 rounded-full bg-gray-900 flex items-center justify-center text-white text-xs font-medium">
                                                    {task.assignedUser.email?.[0]?.toUpperCase() || "?"}
                                                </div>
                                                <span className="text-sm text-gray-700 truncate">
                                                    {task.assignedUser.name || task.assignedUser.email}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-sm text-gray-400">—</span>
                                        )}
                                    </div>

                                    {/* Status */}
                                    <div className="col-span-2 flex items-center">
                                        <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(task.status)}`}>
                                            {task.status || "To Do"}
                                        </span>
                                    </div>

                                    {/* Priority */}
                                    <div className="col-span-1 flex items-center">
                                        <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
                                            {task.priority || "—"}
                                        </span>
                                    </div>

                                    {/* Due Date */}
                                    <div className="col-span-1 flex items-center">
                                        <span className="text-sm text-gray-500">
                                            {task.dueDate ? new Date(task.dueDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "—"}
                                        </span>
                                    </div>

                                    {/* Actions */}
                                    <div className="col-span-1 flex items-center justify-end">
                                        <button className="p-1 text-gray-400 hover:text-gray-900 hover:bg-gray-100 rounded opacity-0 group-hover:opacity-100 transition-all">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Add Task Row */}
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="w-full px-4 py-3 text-left text-sm text-gray-500 hover:bg-gray-50 transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add task
                        </button>
                    </div>
                )}
            </div>

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
