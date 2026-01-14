import { useState } from "react";
import meetingApi from "../api/meetingApi";

export default function useMeeting() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createMeeting = async ({ title, startTime, participants = [] }) => {
    setLoading(true);
    setError(null);
    try {
      
      const payload = {
        title,
        startTime: startTime || new Date().toISOString(),
        participants, 
      };
      const res = await meetingApi.createMeeting(payload);
      setLoading(false);
      return { success: true, meeting: res.data };
    } catch (err) {
      setLoading(false);
      const message = err.response?.data?.message || err.message || "Create meeting failed";
      setError(message);
      return { success: false, message };
    }
  };

  return { createMeeting, loading, error };
}
