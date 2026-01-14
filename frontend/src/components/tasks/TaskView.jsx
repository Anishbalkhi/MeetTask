import { useState } from "react";
import { useWorkspace } from "../../context/WorkspaceContext";
import { FiList, FiGrid, FiCheckCircle, FiCircle, FiUser, FiCalendar, FiMoreHorizontal } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

const TaskView = ({ userOnly = false, title }) => {
    const { tasks, currentWorkspace, loading, taskLoading } = useWorkspace();
    const [viewMode, setViewMode] = useState("list"); 

    const filteredTasks = tasks; 

    const statusColors = {
        "TODO": "bg-gray-500/10 text-gray-400 border-gray-500/20",
        "IN_PROGRESS": "bg-blue-500/10 text-blue-400 border-blue-500/20",
        "DONE": "bg-green-500/10 text-green-400 border-green-500/20",
    };

    if (loading || taskLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="w-8 h-8 border-2 border-[#CCFF00] border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (!currentWorkspace && !userOnly) {
        return (
            <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                    <FiGrid className="text-2xl opacity-50" />
                </div>
                <p>Select a workspace to view tasks.</p>
            </div>
        );
    }

    return (
        <div className="w-full pt-6 pb-20">

            
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-1 tracking-tight">
                        {title}
                    </h1>
                    <p className="text-gray-400 text-sm">
                        {currentWorkspace ? currentWorkspace.name : "Personal Tasks"}
                    </p>
                </div>

                <div className="bg-[#141517] p-1 rounded-lg border border-white/10 flex backdrop-blur-md">
                    <button
                        onClick={() => setViewMode("list")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${viewMode === 'list' ? 'bg-[#CCFF00] text-black shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        <FiList /> Table
                    </button>
                    <button
                        onClick={() => setViewMode("block")}
                        className={`px-3 py-1.5 rounded-md text-xs font-medium flex items-center gap-2 transition-all ${viewMode === 'block' ? 'bg-[#CCFF00] text-black shadow-md' : 'text-gray-400 hover:text-gray-200'}`}
                    >
                        <FiGrid /> Board
                    </button>
                </div>
            </div>

            
            {filteredTasks.length === 0 ? (
                <div className="text-center py-32 text-gray-500 bg-[#141517]/60 rounded-2xl border border-white/10 border-dashed mx-2">
                    <p>No tasks found.</p>
                </div>
            ) : (
                <>
                    {viewMode === 'list' ? (
                        <div className="overflow-x-auto rounded-xl border border-white/10 bg-[#141517]/80 backdrop-blur-sm">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b border-white/10 text-xs text-gray-400 uppercase tracking-wider">
                                        <th className="px-6 py-4 font-medium">Task</th>
                                        <th className="px-6 py-4 font-medium w-40">Status</th>
                                        <th className="px-6 py-4 font-medium w-48">Assignee</th>
                                        <th className="px-6 py-4 font-medium w-32">Priority</th>
                                    </tr>
                                </thead>
                                <tbody className="text-sm divide-y divide-white/5">
                                    {filteredTasks.map((task) => (
                                        <tr key={task.id} className="group hover:bg-white/5 transition-colors">
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-2 h-2 rounded-full ${task.status === 'DONE' ? 'bg-green-500' : 'bg-blue-500'}`}></div>
                                                    <span className="font-medium text-gray-200 group-hover:text-white transition-colors">
                                                        {task.title}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold border uppercase ${statusColors[task.status] || 'text-gray-400 border-gray-700'}`}>
                                                    {task.status?.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center gap-2 text-gray-400">
                                                    {task.assignee ? (
                                                        <>
                                                            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-[8px] text-white font-bold">
                                                                {task.assignee.name?.[0]}
                                                            </div>
                                                            <span className="truncate max-w-[100px]">{task.assignee.name}</span>
                                                        </>
                                                    ) : (
                                                        <span className="opacity-50 text-xs text-gray-600">Unassigned</span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-3">
                                                <div className="flex items-center">
                                                    <FiMoreHorizontal className="text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer hover:text-white" />
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <div className="flex gap-6 overflow-x-auto pb-4 px-2">
                            {['TODO', 'IN_PROGRESS', 'DONE'].map(status => {
                                const columnTasks = filteredTasks.filter(t => t.status === status);

                                return (
                                    <div key={status} className="min-w-[320px] bg-[#141517]/80 backdrop-blur-sm rounded-xl border border-white/10 p-4 flex flex-col gap-4">
                                        <div className="flex items-center justify-between px-1">
                                            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">{status.replace('_', ' ')}</h3>
                                            <span className="bg-white/5 text-gray-500 text-[10px] px-2 py-0.5 rounded-full">{columnTasks.length}</span>
                                        </div>

                                        <div className="flex flex-col gap-3 min-h-[100px]">
                                            {columnTasks.map(task => (
                                                <div key={task.id} className="bg-[#141517] p-4 rounded-lg border border-white/10 hover:border-[#CCFF00]/50 transition-all cursor-pointer shadow-sm hover:shadow-lg group relative overflow-hidden">
                                                    <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-[#CCFF00]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                                    <p className="text-gray-200 font-medium text-sm mb-3 group-hover:text-[#CCFF00] transition-colors">{task.title}</p>

                                                    <div className="flex items-center justify-between mt-auto">
                                                        {task.assignee ? (
                                                            <img src={`https://i.pravatar.cc/150?u=${task.id}`} className="w-5 h-5 rounded-full ring-2 ring-[#141517]" alt="Assignee" />
                                                        ) : (
                                                            <div className="w-5 h-5 rounded-full bg-white/5 ring-2 ring-[#141517]"></div>
                                                        )}
                                                        <div className="text-[10px] text-gray-400 bg-black/30 px-1.5 py-0.5 rounded">
                                                            {task.id.substring(0, 4)}
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {columnTasks.length === 0 && (
                                                <div className="h-full border-2 border-dashed border-white/5 rounded-lg flex items-center justify-center text-gray-600 text-xs">
                                                    Empty
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default TaskView;
