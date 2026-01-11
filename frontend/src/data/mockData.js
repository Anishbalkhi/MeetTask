// Mock data for testing MeetTask application

export const mockUsers = [
  {
    id: "user_1",
    name: "Alex Johnson",
    email: "alex@meettask.com",
    avatar: null,
    role: "Admin",
    status: "online",
    createdAt: "2024-01-15"
  },
  {
    id: "user_2",
    name: "Sarah Williams",
    email: "sarah@meettask.com",
    avatar: null,
    role: "Member",
    status: "online",
    createdAt: "2024-01-20"
  },
  {
    id: "user_3",
    name: "Michael Chen",
    email: "michael@meettask.com",
    avatar: null,
    role: "Member",
    status: "away",
    createdAt: "2024-02-01"
  },
  {
    id: "user_4",
    name: "Emma Davis",
    email: "emma@meettask.com",
    avatar: null,
    role: "Member",
    status: "online",
    createdAt: "2024-02-10"
  },
  {
    id: "user_5",
    name: "James Rodriguez",
    email: "james@meettask.com",
    avatar: null,
    role: "Member",
    status: "offline",
    createdAt: "2024-02-15"
  }
];

export const mockWorkspaces = [
  {
    id: "ws_1",
    name: "Tech Startup",
    description: "Main workspace for our tech startup operations",
    ownerId: "user_1",
    members: ["user_1", "user_2", "user_3", "user_4"],
    createdAt: "2024-01-15",
    icon: "💼"
  },
  {
    id: "ws_2",
    name: "Design Team",
    description: "Collaborative space for design projects",
    ownerId: "user_1",
    members: ["user_1", "user_2", "user_5"],
    createdAt: "2024-02-01",
    icon: "🎨"
  },
  {
    id: "ws_3",
    name: "Marketing Hub",
    description: "Marketing campaigns and content planning",
    ownerId: "user_2",
    members: ["user_2", "user_3", "user_4"],
    createdAt: "2024-02-10",
    icon: "📢"
  }
];

export const mockTasks = [
  // Tech Startup workspace tasks
  {
    id: "task_1",
    title: "Design new landing page",
    description: "Create a modern, responsive landing page for our product launch",
    status: "in-progress",
    priority: "high",
    workspaceId: "ws_1",
    assignedTo: ["user_2", "user_4"],
    createdBy: "user_1",
    dueDate: "2026-01-15",
    createdAt: "2026-01-05",
    tags: ["design", "frontend", "urgent"],
    progress: 60
  },
  {
    id: "task_2",
    title: "Set up CI/CD pipeline",
    description: "Configure automated deployment pipeline for the main application",
    status: "todo",
    priority: "medium",
    workspaceId: "ws_1",
    assignedTo: ["user_3"],
    createdBy: "user_1",
    dueDate: "2026-01-20",
    createdAt: "2026-01-06",
    tags: ["devops", "backend"],
    progress: 0
  },
  {
    id: "task_3",
    title: "API endpoint optimization",
    description: "Improve response time of user authentication endpoints",
    status: "done",
    priority: "high",
    workspaceId: "ws_1",
    assignedTo: ["user_3"],
    createdBy: "user_1",
    dueDate: "2026-01-10",
    createdAt: "2026-01-03",
    tags: ["backend", "performance"],
    progress: 100
  },
  {
    id: "task_4",
    title: "Write unit tests",
    description: "Add comprehensive unit tests for the task management module",
    status: "in-progress",
    priority: "medium",
    workspaceId: "ws_1",
    assignedTo: ["user_2"],
    createdBy: "user_1",
    dueDate: "2026-01-18",
    createdAt: "2026-01-07",
    tags: ["testing", "quality"],
    progress: 35
  },
  {
    id: "task_5",
    title: "User onboarding flow",
    description: "Design and implement a smooth user onboarding experience",
    status: "in-progress",
    priority: "high",
    workspaceId: "ws_1",
    assignedTo: ["user_2", "user_3"],
    createdBy: "user_1",
    dueDate: "2026-01-22",
    createdAt: "2026-01-08",
    tags: ["ux", "frontend"],
    progress: 45
  },
  {
    id: "task_6",
    title: "Database migration",
    description: "Migrate from SQLite to PostgreSQL for production",
    status: "todo",
    priority: "low",
    workspaceId: "ws_1",
    assignedTo: ["user_3"],
    createdBy: "user_1",
    dueDate: "2026-02-01",
    createdAt: "2026-01-09",
    tags: ["database", "backend"],
    progress: 0
  },

  // Design Team workspace tasks
  {
    id: "task_7",
    title: "Create design system",
    description: "Build a comprehensive design system with components and guidelines",
    status: "in-progress",
    priority: "high",
    workspaceId: "ws_2",
    assignedTo: ["user_2"],
    createdBy: "user_2",
    dueDate: "2026-01-25",
    createdAt: "2026-01-10",
    tags: ["design-system", "ui"],
    progress: 70
  },
  {
    id: "task_8",
    title: "Logo redesign",
    description: "Refresh the company logo with modern aesthetics",
    status: "done",
    priority: "medium",
    workspaceId: "ws_2",
    assignedTo: ["user_2"],
    createdBy: "user_1",
    dueDate: "2026-01-12",
    createdAt: "2026-01-05",
    tags: ["branding", "graphics"],
    progress: 100
  },
  {
    id: "task_9",
    title: "Mobile app mockups",
    description: "Design high-fidelity mockups for iOS and Android apps",
    status: "todo",
    priority: "medium",
    workspaceId: "ws_2",
    assignedTo: ["user_5"],
    createdBy: "user_1",
    dueDate: "2026-01-30",
    createdAt: "2026-01-11",
    tags: ["mobile", "mockups"],
    progress: 0
  },

  // Marketing Hub workspace tasks
  {
    id: "task_10",
    title: "Q1 content calendar",
    description: "Plan and schedule all social media content for Q1 2026",
    status: "in-progress",
    priority: "high",
    workspaceId: "ws_3",
    assignedTo: ["user_4"],
    createdBy: "user_2",
    dueDate: "2026-01-16",
    createdAt: "2026-01-08",
    tags: ["content", "social-media"],
    progress: 50
  },
  {
    id: "task_11",
    title: "Email campaign setup",
    description: "Create automated email campaign for product launch",
    status: "todo",
    priority: "high",
    workspaceId: "ws_3",
    assignedTo: ["user_3", "user_4"],
    createdBy: "user_2",
    dueDate: "2026-01-20",
    createdAt: "2026-01-09",
    tags: ["email", "marketing"],
    progress: 0
  },
  {
    id: "task_12",
    title: "Competitor analysis",
    description: "Research and analyze top 5 competitors in the market",
    status: "done",
    priority: "medium",
    workspaceId: "ws_3",
    assignedTo: ["user_3"],
    createdBy: "user_2",
    dueDate: "2026-01-11",
    createdAt: "2026-01-04",
    tags: ["research", "strategy"],
    progress: 100
  },
  {
    id: "task_13",
    title: "SEO optimization",
    description: "Optimize website content for better search engine rankings",
    status: "in-progress",
    priority: "medium",
    workspaceId: "ws_3",
    assignedTo: ["user_4"],
    createdBy: "user_2",
    dueDate: "2026-01-28",
    createdAt: "2026-01-10",
    tags: ["seo", "content"],
    progress: 25
  }
];

export const mockMeetings = [
  {
    id: "meeting_1",
    title: "Sprint Planning",
    workspaceId: "ws_1",
    startTime: "2026-01-15T10:00:00",
    endTime: "2026-01-15T11:00:00",
    participants: ["user_1", "user_2", "user_3"],
    status: "scheduled",
    description: "Plan tasks and goals for the upcoming sprint"
  },
  {
    id: "meeting_2",
    title: "Design Review",
    workspaceId: "ws_2",
    startTime: "2026-01-16T14:00:00",
    endTime: "2026-01-16T15:00:00",
    participants: ["user_1", "user_2", "user_5"],
    status: "scheduled",
    description: "Review and provide feedback on recent design work"
  },
  {
    id: "meeting_3",
    title: "Marketing Strategy Session",
    workspaceId: "ws_3",
    startTime: "2026-01-14T09:00:00",
    endTime: "2026-01-14T10:30:00",
    participants: ["user_2", "user_3", "user_4"],
    status: "completed",
    description: "Discuss Q1 marketing strategies and campaigns"
  }
];

export const mockComments = [
  {
    id: "comment_1",
    taskId: "task_1",
    userId: "user_2",
    content: "I've completed the initial wireframes. Ready for review!",
    createdAt: "2026-01-08T14:30:00"
  },
  {
    id: "comment_2",
    taskId: "task_1",
    userId: "user_1",
    content: "Looks great! Let's implement the responsive version next.",
    createdAt: "2026-01-08T15:00:00"
  },
  {
    id: "comment_3",
    taskId: "task_4",
    userId: "user_2",
    content: "Added tests for the core functionality. Will tackle edge cases tomorrow.",
    createdAt: "2026-01-10T16:45:00"
  }
];

// Helper functions
export const getUserById = (userId) => {
  return mockUsers.find(user => user.id === userId);
};

export const getWorkspaceById = (workspaceId) => {
  return mockWorkspaces.find(ws => ws.id === workspaceId);
};

export const getTasksByWorkspace = (workspaceId) => {
  return mockTasks.filter(task => task.workspaceId === workspaceId);
};

export const getTasksByStatus = (workspaceId, status) => {
  return mockTasks.filter(task => 
    task.workspaceId === workspaceId && task.status === status
  );
};

export const getUserTasks = (userId) => {
  return mockTasks.filter(task => 
    task.assignedTo.includes(userId)
  );
};

export const getTaskStats = (workspaceId) => {
  const tasks = getTasksByWorkspace(workspaceId);
  return {
    total: tasks.length,
    todo: tasks.filter(t => t.status === 'todo').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    done: tasks.filter(t => t.status === 'done').length
  };
};

export default {
  mockUsers,
  mockWorkspaces,
  mockTasks,
  mockMeetings,
  mockComments,
  getUserById,
  getWorkspaceById,
  getTasksByWorkspace,
  getTasksByStatus,
  getUserTasks,
  getTaskStats
};
