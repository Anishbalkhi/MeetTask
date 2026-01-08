import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
    return (
        <div className="min-h-screen text-slate-900 flex relative overflow-hidden font-inter selection:bg-purple-200/50 bg-gradient-to-br from-purple-50 via-blue-50/30 to-white">

            {/* Sidebar */}
            <Sidebar />

            <div className="flex-1 ml-[72px] flex flex-col min-h-screen relative z-10 transition-all">
                {/* Header */}
                <Header />

                {/* Main Content Area */}
                <main className="flex-1 p-6 md:px-8 md:py-6 overflow-y-auto overflow-x-hidden scrollbar-thin">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;





