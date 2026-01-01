import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Dashboard = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="w-full bg-white shadow-sm py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-600">MeetFlow</h1>
        
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Welcome!</span>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="px-6 md:px-20 py-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h2>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">Welcome to your dashboard!</p>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
