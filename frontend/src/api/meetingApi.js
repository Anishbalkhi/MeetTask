import axiosClient from "./axiosClient";

const meetingApi = {
  createMeeting: (payload) => axiosClient.post("/meetings", payload),
  getMeeting: (meetingId) => axiosClient.get(`/meetings/${meetingId}`),
  listMeetings: () => axiosClient.get("/meetings"),
};

export default meetingApi;
