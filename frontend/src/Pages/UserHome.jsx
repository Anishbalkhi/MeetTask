import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiPlus, FiGrid, FiList, FiFilter } from "react-icons/fi";
import { useWorkspace } from "../context/WorkspaceContext";
import { getUserTasks, createTask } from "../api/taskApi";
import TaskList from "../components/tasks/TaskList";
import CreateTaskModal from "../components/tasks/CreateTaskModal";

const UserHome = () => {
    const { currentWorkspace } = useWorkspace();
    const [userTasks, setUserTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [createLoading, setCreateLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [viewMode, setViewMode] = useState("grid"); // grid or list
    const [filterStatus, setFilterStatus] = useState("all");

    // Fetch user's tasks
    useEffect(() => {
        const fetchUserTasks = async () => {
            try {
                setLoading(true);
                const res = await getUserTasks();
                setUserTasks(res.data || []);
            } catch (error) {
                console.error("Failed to fetch user tasks:", error);
                setUserTasks([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserTasks();
    }, []);

    // Handle create task
    const handleCreateTask = async (taskData) => {
        if (!currentWorkspace) {
            alert("Please select a workspace first");
            return;
        }

        try {
            setCreateLoading(true);
            const res = await createTask(currentWorkspace.id, taskData);
            setUserTasks((prev) => [res.data, ...prev]);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Failed to create task:", error);
            alert(error.response?.data?.message || "Failed to create task");
        } finally {
            setCreateLoading(false);
        }
    };

    // Filter tasks by status
    const filteredTasks = filterStatus === "all"
        ? userTasks
        : userTasks.filter(task => task.status?.toLowerCase() === filterStatus.toLowerCase());

    return (
        <div className="min-h-full animate-fade-in">
            {/* Page Header */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-1">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 mb-1 flex items-center gap-3">
                            My Tasks
                            <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
                                {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''}
                            </span>
                        </h1>
                        <p className="text-slate-600 text-sm">
                            Manage your personal tasks across all workspaces
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
                {/* Filter by Status */}
                <div className="flex items-center gap-1 bg-white rounded-lg p-1 border border-slate-200 shadow-sm">
                    <button
                        onClick={() => setFilterStatus("all")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium transition-all ${filterStatus === "all"
                            ? "bg-purple-600 text-white shadow-sm"
                            : "text-slate-600 hover:bg-slate-50"
                            }`}
                    >
                        All
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

            {/* Tasks Section */}
            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <div className="animate-spin rounded-full h-10 w-10 border-3 border-purple-200 border-t-purple-600"></div>
                </div>
            ) : (
                <TaskList
                    tasks={filteredTasks}
                    emptyMessage="You don't have any tasks yet"
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

export default UserHome;
