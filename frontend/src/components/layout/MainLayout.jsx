import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const MainLayout = () => {
    return (
        <div className="min-h-screen flex bg-gray-50">
            {/* Sidebar - Shows on desktop as left sidebar, on mobile as bottom nav */}
            <Sidebar />

            {/* Main Content - No left margin on mobile, ml-16 on desktop */}
            <div className="flex-1 md:ml-16 flex flex-col min-h-screen">
                {/* Header */}
                <Header />

                {/* Main Content Area - Add bottom padding on mobile for bottom nav */}
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
