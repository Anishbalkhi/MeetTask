# Mock Data Guide - Testing Setup

## Date: January 10, 2026, 11:32 PM IST

---

## 📦 **Mock Data Created!**

Comprehensive fake data has been added for testing your MeetTask application.

---

## 📁 **File Location**

```
frontend/src/data/mockData.js
```

---

## 🎭 **What's Included**

### **1. Mock Users (5 users)**
```javascript
- Alex Johnson (Admin, online)
- Sarah Williams (Member, online)
- Michael Chen (Member, away)
- Emma Davis (Member, online)
- James Rodriguez (Member, offline)
```

### **2. Mock Workspaces (3 workspaces)**
```javascript
- Tech Startup 💼 (4 members, 6 tasks)
- Design Team 🎨 (3 members, 3 tasks)
- Marketing Hub 📢 (3 members, 4 tasks)
```

### **3. Mock Tasks (13 tasks)**
**Statuses:**
- ✅ Done: 4 tasks
- 🔄 In Progress: 6 tasks
- ⏳ To Do: 3 tasks

**Priorities:**
- 🔴 High: 6 tasks
- 🟡 Medium: 6 tasks
- 🟢 Low: 1 task

### **4. Mock Meetings (3 meetings)**
- Sprint Planning (scheduled)
- Design Review (scheduled)
- Marketing Strategy (completed)

### **5. Mock Comments (3 comments)**
- Task discussions and updates

---

## 💡 **How to Use**

### **Import in Your Components:**

```javascript
import {
  mockUsers,
  mockWorkspaces,
  mockTasks,
  mockMeetings,
  getUserById,
  getTasksByWorkspace,
  getUserTasks
} from '../data/mockData';
```

### **Example Usage:**

#### **1. Display All Workspaces**
```javascript
import { mockWorkspaces } from '../data/mockData';

const WorkspaceList = () => {
  return (
    <div>
      {mockWorkspaces.map(ws => (
        <div key={ws.id}>
          <h3>{ws.icon} {ws.name}</h3>
          <p>{ws.description}</p>
        </div>
      ))}
    </div>
  );
};
```

#### **2. Show User Tasks**
```javascript
import { getUserTasks, getUserById } from '../data/mockData';

const MyTasks = ({ userId }) => {
  const tasks = getUserTasks(userId);
  
  return (
    <div>
      <h2>My Tasks ({tasks.length})</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <h4>{task.title}</h4>
          <span>{task.status}</span>
        </div>
      ))}
    </div>
  );
};
```

#### **3. Workspace Dashboard**
```javascript
import { getTasksByWorkspace, getTaskStats } from '../data/mockData';

const WorkspaceDashboard = ({ workspaceId }) => {
  const tasks = getTasksByWorkspace(workspaceId);
  const stats = getTaskStats(workspaceId);
  
  return (
    <div>
      <h2>Workspace Overview</h2>
      <p>Total: {stats.total}</p>
      <p>To Do: {stats.todo}</p>
      <p>In Progress: {stats.inProgress}</p>
      <p>Done: {stats.done}</p>
    </div>
  );
};
```

#### **4. Team Members List**
```javascript
import { mockUsers, getWorkspaceById } from '../data/mockData';

const TeamMembers = ({ workspaceId }) => {
  const workspace = getWorkspaceById(workspaceId);
  const members = mockUsers.filter(u => 
    workspace.members.includes(u.id)
  );
  
  return (
    <div>
      {members.map(member => (
        <div key={member.id}>
          <p>{member.name} - {member.role}</p>
          <span>{member.status}</span>
        </div>
      ))}
    </div>
  );
};
```

---

## 🔧 **Helper Functions Available**

### **User Helpers:**
```javascript
getUserById(userId)
// Returns: user object or undefined
```

### **Workspace Helpers:**
```javascript
getWorkspaceById(workspaceId)
// Returns: workspace object or undefined
```

### **Task Helpers:**
```javascript
getTasksByWorkspace(workspaceId)
// Returns: array of tasks for workspace

getTasksByStatus(workspaceId, status)
// Returns: filtered tasks by status

getUserTasks(userId)
// Returns: tasks assigned to user

getTaskStats(workspaceId)
// Returns: { total, todo, inProgress, done }
```

---

## 📊 **Data Structure**

### **User Object:**
```javascript
{
  id: "user_1",
  name: "Alex Johnson",
  email: "alex@meettask.com",
  avatar: null,
  role: "Admin" | "Member",
  status: "online" | "away" | "offline",
  createdAt: "2024-01-15"
}
```

### **Workspace Object:**
```javascript
{
  id: "ws_1",
  name: "Tech Startup",
  description: "Main workspace...",
  ownerId: "user_1",
  members: ["user_1", "user_2"],
  createdAt: "2024-01-15",
  icon: "💼"
}
```

### **Task Object:**
```javascript
{
  id: "task_1",
  title: "Design new landing page",
  description: "Create a modern...",
  status: "in-progress" | "todo" | "done",
  priority: "high" | "medium" | "low",
  workspaceId: "ws_1",
  assignedTo: ["user_2"],
  createdBy: "user_1",
  dueDate: "2026-01-15",
  createdAt: "2026-01-05",
  tags: ["design", "frontend"],
  progress: 60
}
```

---

## 🎯 **Integration with Contexts**

### **Update WorkspaceContext:**
```javascript
import { mockWorkspaces } from '../data/mockData';

const [workspaces, setWorkspaces] = useState(mockWorkspaces);
const [currentWorkspace, setCurrentWorkspace] = useState(mockWorkspaces[0]);
```

### **Update AuthContext:**
```javascript
import { mockUsers } from '../data/mockData';

// Use first user as default logged-in user
const mockUser = mockUsers[0];
```

---

## 📈 **Mock Data Statistics**

### **Users:**
- Total: 5 users
- Admins: 1
- Members: 4
- Online: 3
- Away: 1
- Offline: 1

### **Workspaces:**
- Total: 3 workspaces
- Tech Startup: 4 members, 6 tasks
- Design Team: 3 members, 3 tasks
- Marketing Hub: 3 members, 4 tasks

### **Tasks:**
- Total: 13 tasks
- ✅ Done: 4 (31%)
- 🔄 In Progress: 6 (46%)
- ⏳ To Do: 3 (23%)

**By Priority:**
- 🔴 High: 6 (46%)
- 🟡 Medium: 6 (46%)
- 🟢 Low: 1 (8%)

### **Meetings:**
- Total: 3 meetings
- Scheduled: 2
- Completed: 1

---

## 🎨 **Task Details**

### **Tech Startup Tasks:**
1. Design new landing page (In Progress, High, 60%)
2. Set up CI/CD pipeline (To Do, Medium, 0%)
3. API endpoint optimization (Done, High, 100%)
4. Write unit tests (In Progress, Medium, 35%)
5. User onboarding flow (In Progress, High, 45%)
6. Database migration (To Do, Low, 0%)

### **Design Team Tasks:**
7. Create design system (In Progress, High, 70%)
8. Logo redesign (Done, Medium, 100%)
9. Mobile app mockups (To Do, Medium, 0%)

### **Marketing Hub Tasks:**
10. Q1 content calendar (In Progress, High, 50%)
11. Email campaign setup (To Do, High, 0%)
12. Competitor analysis (Done, Medium, 100%)
13. SEO optimization (In Progress, Medium, 25%)

---

## 🚀 **Quick Start**

### **1. Test User Login:**
Use any mock user:
```javascript
Email: alex@meettask.com
Password: (any password in mock mode)
```

### **2. See Populated Dashboard:**
Login will show:
- 3 workspaces available
- 13 total tasks
- 5 team members
- 3 scheduled meetings

### **3. Test Task Management:**
- View tasks in different statuses
- See task assignments
- Check progress bars
- View due dates

---

## 💡 **Pro Tips**

### **1. Random Data:**
To get a random user:
```javascript
const randomUser = mockUsers[
  Math.floor(Math.random() * mockUsers.length)
];
```

### **2. Filter by Tag:**
```javascript
const designTasks = mockTasks.filter(t => 
  t.tags.includes('design')
);
```

### **3. Due Today:**
```javascript
const today = new Date().toISOString().split('T')[0];
const dueTodayTasks = mockTasks.filter(t => 
  t.dueDate === today
);
```

### **4. High Priority:**
```javascript
const urgentTasks = mockTasks.filter(t => 
  t.priority === 'high' && t.status !== 'done'
);
```

---

## 🎉 **Benefits**

### **For Development:**
- ✅ Populate UI instantly
- ✅ Test all features without backend
- ✅ See realistic data scenarios
- ✅ Demo-ready application

### **For Testing:**
- ✅ Consistent test data
- ✅ Various edge cases covered
- ✅ Multiple user scenarios
- ✅ Different task states

### **For Demos:**
- ✅ Professional appearance
- ✅ Realistic workflows
- ✅ Complete user journey
- ✅ Impressive showcase

---

## 📝 **Next Steps**

1. ✅ Import mock data in your components
2. ✅ Replace empty states with mock data
3. ✅ Test all features with realistic data
4. ✅ Refine UI based on data display
5. ✅ Ready for client demos!

---

## 🎊 **Summary**

You now have:
- ✅ **5 realistic users** with different roles
- ✅ **3 diverse workspaces** with teams
- ✅ **13 varied tasks** with all statuses
- ✅ **3 meetings** scheduled/completed
- ✅ **Helper functions** for easy access
- ✅ **Complete test environment**

**Your application is now fully populated and ready for testing!** 🚀✨

---

**Mock Data:** ✅ Complete  
**Users:** 5 | **Workspaces:** 3 | **Tasks:** 13  
**Ready for:** Testing, Demos, Development  
**Status:** 🎯 Production-Quality Mock Data!
