import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useMeeting from "../hooks/useMeeting";
import { AuthContext } from "../context/AuthContext";
import { Video, Calendar, Users, ArrowLeft, Clock, Plus } from "lucide-react";
import AnimatedBackground from "../components/common/AnimatedBackground";

export default function CreateMeeting() {
  const { user } = useContext(AuthContext);
  const { createMeeting, loading } = useMeeting();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [scheduledFor, setScheduledFor] = useState("");
  const [participants, setParticipants] = useState("");
  const [error, setError] = useState(null);

  const validate = () => {
    if (!title.trim()) return "Please enter a meeting title";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const v = validate();
    if (v) {
      setError(v);
      return;
    }
    setError(null);
    const participantsArr = participants
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);

    const payload = {
      title,
      startTime: scheduledFor || new Date().toISOString(),
      participants: participantsArr,
    };

    const res = await createMeeting(payload);
    if (res.success) {
      navigate(`/meeting/${res.meeting.id}`);
    } else {
      setError(res.message || "Unable to create meeting");
    }
  };

  const handleStartNow = () => {
    setScheduledFor(new Date().toISOString().slice(0, 16));
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 relative overflow-hidden">
      
      <AnimatedBackground />

      <div className="w-full max-w-2xl">
        
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 font-medium transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </button>

        <div className="bg-white border border-gray-200 rounded-lg p-8">
          
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-white">
              <Video className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Create Meeting</h2>
              <p className="text-gray-600 text-sm">Start an AI-powered video meeting</p>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Title *
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Sprint Planning, Design Review, Team Sync..."
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-300 transition-colors"
                required
              />
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Schedule Time <span className="text-gray-400 font-normal">(Optional)</span>
              </label>
              <input
                type="datetime-local"
                value={scheduledFor}
                onChange={(e) => setScheduledFor(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-300 transition-colors"
              />
              <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Leave empty to start immediately
              </p>
            </div>

            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
                <Users className="w-4 h-4" />
                Invite Participants
              </label>
              <textarea
                value={participants}
                onChange={(e) => setParticipants(e.target.value)}
                placeholder="Enter email addresses separated by commas&#10;Example: alice@company.com, bob@company.com"
                className="w-full px-3 py-2 bg-white border border-gray-200 rounded text-gray-900 text-sm focus:outline-none focus:border-gray-300 transition-colors resize-none"
                rows="4"
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">
                Participants will receive an invitation link via email
              </p>
            </div>

            
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-1 text-sm">AI-Powered Features</h4>
              <p className="text-sm text-gray-600">
                Your meeting will include live transcription and automatic task extraction powered by AI.
              </p>
            </div>

            
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-4">
              <button
                type="submit"
                className="w-full sm:flex-1 bg-gray-900 text-white px-6 py-2.5 rounded font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 text-sm flex items-center justify-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating...
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Create Meeting
                  </>
                )}
              </button>

              <button
                type="button"
                className="w-full sm:w-auto px-6 py-2.5 rounded border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors text-sm flex items-center justify-center gap-2"
                onClick={handleStartNow}
              >
                <Video className="w-4 h-4" />
                Start Now
              </button>
            </div>
          </form>

          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600 text-center">
              Creating meeting as <span className="font-semibold text-gray-900">{user?.name || "Guest"}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
