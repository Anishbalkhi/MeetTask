import axiosClient from "./axiosClient";

export const getAllWorkspaces = () => 
    axiosClient.get("/workspaces");

export const createWorkspace = (data) => 
    axiosClient.post("/workspaces", data);

export const getWorkspaceMembers = (workspaceId) => 
    axiosClient.get(`/workspaces/${workspaceId}/members`);

export const inviteMember = (workspaceId, email) => 
    axiosClient.post(`/workspaces/${workspaceId}/invite`, { email });
