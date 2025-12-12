import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useMeeting from "../hooks/useMeeting";
import { AuthContext } from "../context/AuthContext";

export default function CreateMeeting() {
  const { user } = useContext(AuthContext);
  const { createMeeting, loading } = useMeeting();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [scheduledFor, setScheduledFor] = useState(""); // ISO datetime string
  const [participants, setParticipants] = useState(""); // comma separated emails or IDs
  const [error, setError] = useState(null);

  const validate = () => {
    if (!title.trim()) return "Please enter a meeting title";
    // optional: validate scheduledFor is future date
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
      // Navigate to meeting room
      navigate(`/meeting/${res.meeting.id}`);
    } else {
      setError(res.message || "Unable to create meeting");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-md p-8">
        <h2 className="text-2xl font-bold mb-4">Create New Meeting</h2>

        {error && <div className="text-red-600 mb-3">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Meeting Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Sprint planning / Design review"
              className="mt-1 block w-full p-3 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Schedule (optional)</label>
            <input
              type="datetime-local"
              value={scheduledFor}
              onChange={(e) => setScheduledFor(e.target.value)}
              className="mt-1 block w-full p-3 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">Leave empty to start immediately</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Participants (comma separated emails or userIds)</label>
            <input
              value={participants}
              onChange={(e) => setParticipants(e.target.value)}
              placeholder="alice@example.com, bob@example.com"
              className="mt-1 block w-full p-3 border rounded-lg"
            />
            <p className="text-xs text-gray-500 mt-1">You can invite by email or user id. Backend will resolve emails to user ids if needed.</p>
          </div>

          <div className="flex items-center space-x-3">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Meeting"}
            </button>

            <button
              type="button"
              className="px-4 py-3 rounded-lg border"
              onClick={() => {
                // quick start meeting: start immediately
                setScheduledFor(new Date().toISOString().slice(0, 16));
              }}
            >
              Start Now
            </button>
          </div>
        </form>

        <p className="mt-4 text-sm text-gray-500">
          You're creating the meeting as <strong>{user?.name || "Guest"}</strong>.
        </p>
      </div>
    </div>
  );
}
