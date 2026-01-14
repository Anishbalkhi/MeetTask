import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import { User, Mail, Lock, Save, Camera, Bell, Shield } from "lucide-react";

const Profile = () => {
    const { user } = useAuth();

    const [activeTab, setActiveTab] = useState("profile");
    const [profileData, setProfileData] = useState({
        name: user?.name || "Guest User",
        email: user?.email || "user@example.com",
        phone: "",
        bio: "",
        avatar: ""
    });

    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        taskUpdates: true,
        weeklyDigest: false,
        mentions: true
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage({ type: "success", text: "Profile updated successfully!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update profile" });
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setMessage({ type: "error", text: "Passwords do not match" });
            return;
        }

        setLoading(true);
        setMessage({ type: "", text: "" });

        try {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage({ type: "success", text: "Password changed successfully!" });
            setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to change password" });
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationUpdate = async () => {
        setLoading(true);
        try {
            
            await new Promise(resolve => setTimeout(resolve, 1000));
            setMessage({ type: "success", text: "Notification preferences updated!" });
        } catch (error) {
            setMessage({ type: "error", text: "Failed to update preferences" });
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: "profile", label: "Profile", icon: User },
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell }
    ];

    return (
        <div className="min-h-screen bg-gray-50 p-6 pb-24 md:pb-6">
            <div className="max-w-4xl mx-auto">
                
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Settings</h1>
                    <p className="text-gray-600">Manage your account settings and preferences</p>
                </div>

                
                {message.text && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-6 p-4 rounded-lg ${message.type === "success"
                                ? "bg-green-50 border border-green-200 text-green-700"
                                : "bg-red-50 border border-red-200 text-red-700"
                            }`}
                    >
                        {message.text}
                    </motion.div>
                )}

                
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex overflow-x-auto">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center gap-2 px-6 py-4 font-medium transition-colors whitespace-nowrap ${activeTab === tab.id
                                            ? "text-gray-900 border-b-2 border-gray-900"
                                            : "text-gray-500 hover:text-gray-700"
                                        }`}
                                >
                                    <tab.icon className="w-5 h-5" />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="p-6">
                        
                        {activeTab === "profile" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    
                                    <div className="flex items-center gap-6">
                                        <div className="relative">
                                            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-3xl font-bold">
                                                {profileData.name.substring(0, 1)}
                                            </div>
                                            <button
                                                type="button"
                                                className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg border-2 border-gray-200 flex items-center justify-center hover:bg-gray-50 transition-colors"
                                            >
                                                <Camera className="w-4 h-4 text-gray-600" />
                                            </button>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">{profileData.name}</h3>
                                            <p className="text-sm text-gray-500">{profileData.email}</p>
                                            <button type="button" className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                                                Change avatar
                                            </button>
                                        </div>
                                    </div>

                                    
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Full Name
                                            </label>
                                            <div className="relative">
                                                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="text"
                                                    value={profileData.name}
                                                    onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Email Address
                                            </label>
                                            <div className="relative">
                                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                <input
                                                    type="email"
                                                    value={profileData.email}
                                                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                                                    className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                                Phone Number
                                            </label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                placeholder="+1 (555) 000-0000"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Bio
                                        </label>
                                        <textarea
                                            value={profileData.bio}
                                            onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                                            rows="4"
                                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
                                            placeholder="Tell us a bit about yourself..."
                                        ></textarea>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 magnetic-hover"
                                        >
                                            <Save className="w-5 h-5" />
                                            {loading ? "Saving..." : "Save Changes"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        
                        {activeTab === "security" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            >
                                <form onSubmit={handlePasswordChange} className="space-y-6">
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Password</h3>

                                        <div className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Current Password
                                                </label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        value={passwordData.currentPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    New Password
                                                </label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        value={passwordData.newPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                                <p className="text-xs text-gray-500 mt-1">Must be at least 8 characters</p>
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Confirm New Password
                                                </label>
                                                <div className="relative">
                                                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="password"
                                                        value={passwordData.confirmPassword}
                                                        onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                                        className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                                        >
                                            <Save className="w-5 h-5" />
                                            {loading ? "Updating..." : "Update Password"}
                                        </button>
                                    </div>
                                </form>
                            </motion.div>
                        )}

                        
                        {activeTab === "notifications" && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                                className="space-y-6"
                            >
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notification Preferences</h3>

                                    <div className="space-y-4">
                                        {Object.entries({
                                            emailNotifications: "Email Notifications",
                                            taskUpdates: "Task Updates",
                                            weeklyDigest: "Weekly Digest",
                                            mentions: "Mentions & Comments"
                                        }).map(([key, label]) => (
                                            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                                                <div>
                                                    <p className="font-medium text-gray-900">{label}</p>
                                                    <p className="text-sm text-gray-500">
                                                        Receive notifications about {label.toLowerCase()}
                                                    </p>
                                                </div>
                                                <button
                                                    type="button"
                                                    onClick={() => setNotifications({ ...notifications, [key]: !notifications[key] })}
                                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifications[key] ? "bg-gray-900" : "bg-gray-300"
                                                        }`}
                                                >
                                                    <span
                                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifications[key] ? "translate-x-6" : "translate-x-1"
                                                            }`}
                                                    />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={handleNotificationUpdate}
                                        disabled={loading}
                                        className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
                                    >
                                        <Save className="w-5 h-5" />
                                        {loading ? "Saving..." : "Save Preferences"}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
