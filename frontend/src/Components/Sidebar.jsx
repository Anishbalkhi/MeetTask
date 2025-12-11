import { FaHome, FaTasks, FaProjectDiagram, FaCalendarAlt, FaVideo } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
const Sidebar = () => {
   const Navigate = useNavigate();
  return (
    <div className="w-20 bg-gradient-to-b from-[#090a0f] to-[#1a1c24] flex flex-col items-center py-6">

      {/* Logo */}
      <div className="text-2xl font-bold mb-10">⚡</div>

      {/* Menu Buttons */}
      <div className="flex flex-col gap-8 text-gray-400 text-xl">

        <button onClick={() => Navigate("/")} className="hover:text-white">
          <FaHome />
        </button>

        

        <button onClick={() => Navigate("/project")} className="hover:text-white">
          <FaTasks />
        </button>

        <button onClick={() => Navigate("/meet")}  className="hover:text-white">
          <FaVideo />
        </button>

        <button onClick={()=> Navigate("/calander")} className="hover:text-white">
          <FaCalendarAlt />
        </button>
      </div>

      {/* Bottom */}
      <div className="mt-auto mb-4 text-gray-500 text-sm">
        © 2025
      </div>

    </div>
  );
};

export default Sidebar;
