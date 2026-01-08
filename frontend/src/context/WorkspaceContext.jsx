import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getAllWorkspaces } from "../api/workspaceApi";
import { getTasks, getUserTasks } from "../api/taskApi";
import { useAuth } from "./AuthContext";

const WorkspaceContext = createContext();

// Mock mode for testing without backend
const MOCK_MODE = true; // Set to false when backend is ready

// Mock data
const MOCK_WORKSPACES = [
    { id: 1, name: "Personal Projects", description: "My personal workspace", memberCount: 1 },
    { id: 2, name: "Company Work", description: "Work-related projects", memberCount: 8 },
    { id: 3, name: "Side Hustles", description: "Freelance projects", memberCount: 3 },
];

const MOCK_TASKS = [
    {
        id: 1,
        title: "Design new landing page",
        description: "Create a modern landing page with hero section and features",
        priority: "high",
        status: "inprogress",
        assignedUser: { id: 1, name: "John Doe", email: "john@example.com", avatar: "https://i.pravatar.cc/150?u=john" },
        dueDate: "2026-01-15",
        workspaceId: 1
    },
    {
        id: 2,
        title: "Fix navigation bug",
        description: "Mobile menu not closing properly on iOS devices",
        priority: "medium",
        status: "todo",
        assignedUser: { id: 2, name: "Jane Smith", email: "jane@example.com", avatar: "https://i.pravatar.cc/150?u=jane" },
        dueDate: "2026-01-12",
        workspaceId: 1
    },
    {
        id: 3,
        title: "Update documentation",
        description: "Add API documentation for new endpoints",
        priority: "low",
        status: "completed",
        assignedUser: { id: 3, name: "Bob Wilson", email: "bob@example.com", avatar: "https://i.pravatar.cc/150?u=bob" },
        dueDate: "2026-01-10",
        workspaceId: 2
    },
    {
        id: 4,
        title: "Implement user authentication",
        description: "Add JWT-based authentication system",
        priority: "high",
        status: "inprogress",
        assignedUser: { id: 4, name: "Alice Johnson", email: "alice@example.com", avatar: "https://i.pravatar.cc/150?u=alice" },
        dueDate: "2026-01-20",
        workspaceId: 2
    },
    {
        id: 5,
        title: "Set up CI/CD pipeline",
        description: "Configure GitHub Actions for automated testing and deployment",
        priority: "medium",
        status: "todo",
        assignedUser: { id: 5, name: "Charlie Brown", email: "charlie@example.com", avatar: "https://i.pravatar.cc/150?u=charlie" },
        dueDate: "2026-01-18",
        workspaceId: 2
    },
    {
        id: 6,
        title: "Design mobile app mockups",
        description: "Create high-fidelity mockups for iOS and Android apps",
        priority: "high",
        status: "inprogress",
        assignedUser: { id: 6, name: "Diana Prince", email: "diana@example.com", avatar: "https://i.pravatar.cc/150?u=diana" },
        dueDate: "2026-01-14",
        workspaceId: 3
    },
];

export const useWorkspace = () => useContext(WorkspaceContext);

export const WorkspaceProvider = ({ children }) => {
    const { token } = useAuth();
    const [workspaces, setWorkspaces] = useState(MOCK_MODE ? MOCK_WORKSPACES : []);
    const [currentWorkspace, setCurrentWorkspace] = useState(MOCK_MODE ? MOCK_WORKSPACES[0] : null);
    const [tasks, setTasks] = useState(MOCK_MODE ? MOCK_TASKS : []);
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
                // Filter mock tasks by workspace
                const filteredTasks = MOCK_TASKS.filter(task => task.workspaceId === currentWorkspace?.id);
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
            const filteredTasks = MOCK_TASKS.filter(task => task.workspaceId === currentWorkspace?.id);
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
