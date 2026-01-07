import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../../context/AuthContext";
import { useWorkspace } from "../../context/WorkspaceContext";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#0f0f11] text-gray-100 flex relative overflow-hidden font-inter selection:bg-purple-500/30">

            {/* BACKGROUND SHAPES (Exact match from Login) */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-purple-600/10 rounded-full blur-[120px] opacity-40 animate-pulse-slow"></div>
                <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[100px] opacity-30 animate-pulse-slow delay-1000"></div>
            </div>

            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 ml-[72px] flex flex-col min-h-screen relative z-10 transition-all">
                {/* Header */}
                <Header />

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:px-8 md:py-6 overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
