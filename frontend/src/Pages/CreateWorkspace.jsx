import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createWorkspace } from "../api/workspaceApi";
import { useWorkspace } from "../context/WorkspaceContext";
import { FiPlus, FiBriefcase, FiX } from "react-icons/fi";

const CreateWorkspace = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { addWorkspaceObj } = useWorkspace();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await createWorkspace({ name, description });
            addWorkspaceObj(res.data);
            navigate("/dashboard/home");
        } catch (error) {
            console.error("Failed to create workspace", error);
            alert("Failed to create workspace");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto pt-20 animate-fade-in-up px-4">
            <div className="bg-[#121315]/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden">

                {/* Decorative blob */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -translate-y-20 translate-x-20 pointer-events-none"></div>

                <div className="flex items-center justify-between mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 flex items-center justify-center text-white shadow-lg shadow-blue-500/20 border border-white/10">
                            <FiBriefcase className="text-2xl" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white tracking-tight">Create Workspace</h1>
                            <p className="text-gray-400 text-sm">Organize your team and tasks</p>
                        </div>
                    </div>
                    <button
                        onClick={() => navigate(-1)}
                        className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-colors"
                    >
                        <FiX className="text-xl" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Workspace Name</label>
                        <input
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all font-medium text-lg"
                            placeholder="e.g. Engineering Team"
                            autoFocus
                        />
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Description <span className="text-gray-600 font-normal normal-case">(Optional)</span></label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-blue-500/50 focus:bg-black/60 transition-all resize-none h-32 text-sm"
                            placeholder="What's this workspace for?"
                        ></textarea>
                    </div>

                    <div className="pt-6">
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-white text-black px-6 py-4 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:scale-[1.01] active:scale-[0.99]"
                        >
                            {loading ? "Creating..." : <><FiPlus className="text-xl" /> Create Workspace</>}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default CreateWorkspace;
