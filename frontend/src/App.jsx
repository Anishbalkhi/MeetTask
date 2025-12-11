import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Sidebar from "./Components/Sidebar.jsx";
import Meet from "./Pages/Meet.jsx";
import Project from "./Pages/project.jsx";
import Calander from "./Pages/Calander.jsx";
import './App.css'

function App() {
 

  return (
        <Router>
      <div className="flex h-screen bg-[#111418] text-white">
        {/* LEFT SIDEBAR */}
        <Sidebar />

        {/* MAIN APP VIEW */}
        <div className="flex-1 overflow-y-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/meet" element={<Meet />} />
            <Route path="/project" element={<Project />} />
             <Route path="/calander" element={<Calander />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App
