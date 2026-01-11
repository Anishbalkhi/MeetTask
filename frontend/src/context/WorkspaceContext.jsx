import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAllWorkspaces } from "../api/workspaceApi";
import { getTasks, getUserTasks } from "../api/taskApi";
import { useAuth } from "./AuthContext";
import { mockWorkspaces, mockTasks, mockUsers, getTasksByWorkspace } from "../data/mockData";

const WorkspaceContext = createContext();

// Mock mode for testing without backend
const MOCK_MODE = true; // Set to false when backend is ready

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children }) => {
    const { token } = useAuth();
    const [workspaces, setWorkspaces] = useState(MOCK_MODE ? mockWorkspaces : []);
    const [currentWorkspace, setCurrentWorkspace] = useState(MOCK_MODE ? mockWorkspaces[0] : null);
    const [tasks, setTasks] = useState(MOCK_MODE ? mockTasks : []);
    const [loading, setLoading] = useState(!MOCK_MODE);
    const [taskLoading, setTaskLoading] = useState(false);

    // Fetch Workspaces on Mount/Login
    const fetchWorkspaces = useCallback(async () => {
        if (MOCK_MODE) {
            setLoading(false);
            return;
        }

        if (!token) return;
        try {
            setLoading(true);
            const res = await getAllWorkspaces();
            setWorkspaces(res.data);
            // Set default query to first workspace if exists
            if (res.data.length > 0 && !currentWorkspace) {
                setCurrentWorkspace(res.data[0]);
            }
        } catch (error) {
            console.error("Failed to fetch workspaces", error);
        } finally {
            setLoading(false);
        }
    }, [token]); // removed currentWorkspace dependency to avoid loop, handled logically

    useEffect(() => {
        fetchWorkspaces();
    }, [fetchWorkspaces]);

    // Fetch Tasks when Workspace Changes
    useEffect(() => {
        const fetchTasks = async () => {
            if (MOCK_MODE) {
                // Use helper to get tasks by workspace
                const filteredTasks = getTasksByWorkspace(currentWorkspace?.id);
                setTasks(filteredTasks);
                return;
            }

            if (!token || !currentWorkspace) return;
            try {
                setTaskLoading(true);
                const res = await getTasks(currentWorkspace.id);
                setTasks(res.data);
            } catch (error) {
                console.error("Failed to fetch tasks", error);
                setTasks([]);
            } finally {
                setTaskLoading(false);
            }
        };

        fetchTasks();
    }, [currentWorkspace, token]);

    // Helper to refresh tasks
    const refreshTasks = async () => {
        if (MOCK_MODE) {
            const filteredTasks = getTasksByWorkspace(currentWorkspace?.id);
            setTasks(filteredTasks);
            return;
        }

        if (currentWorkspace) {
            const res = await getTasks(currentWorkspace.id);
            setTasks(res.data);
        }
    };

    const addWorkspaceObj = (ws) => {
        setWorkspaces(prev => [...prev, ws]);
        setCurrentWorkspace(ws);
    }

    return (
        <WorkspaceContext.Provider
            value={{
                workspaces,
                currentWorkspace,
                setCurrentWorkspace,
                tasks,
                setTasks,
                loading,
                taskLoading,
                refreshTasks,
                addWorkspaceObj
            }}
        >
            {children}
        </WorkspaceContext.Provider>
    );
};
