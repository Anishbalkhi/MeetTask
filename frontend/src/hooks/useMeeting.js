import { useState } from "react";
import meetingApi from "../api/meetingApi";

export default function useMeeting() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMeeting = async ({ title, scheduledFor, participants = [] }) => {
    setLoading(true);
    setError(null);
    try {
      const payload = {
        title,
        startTime: scheduledFor || new Date().toISOString(),
        participants, // array of emails or userIds (backend expects IDs)
      };
      const res = await meetingApi.createMeeting(payload);
      setLoading(false);
      return { success: true, meeting: res.data };
    } catch (err) {
      setLoading(false);
      setError(err.response?.data?.message || err.message);
      return { success: false, message: error || "Create meeting failed" };
    }
  };

  return { createMeeting, loading, error };
}
