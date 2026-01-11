# Backend Integration Test Checklist

This document provides step-by-step instructions to test the integration between the React frontend and Spring Boot backend.

## Prerequisites

Before testing, ensure:

1. **MongoDB is running** on your local machine or remote server
2. **Spring Boot backend is running** on `http://localhost:8080`
3. **Frontend dev server is running** on `http://localhost:5173`
4. **CORS is configured** in Spring Boot to allow `http://localhost:5173`

---

## Spring Boot CORS Configuration

Add this to your Spring Boot application:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/**")
                .allowedOrigins("http://localhost:5173")
                .allowedMethods("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true)
                .maxAge(3600);
    }
}
```

---

## Test Plan

### Phase 1: Authentication Tests

#### Test 1.1: User Registration
**Steps:**
1. Open `http://localhost:5173`
2. Click "Get Started" or "Register"
3. Fill in:
   - Name: "Test User"
   - Email: "test@example.com"
   - Password: "password123"
4. Click "Create account"

**Expected Backend Request:**
```http
POST http://localhost:8080/api/auth/register
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Backend Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Success Indicators:**
- ✅ User is redirected to `/verify-info` or `/dashboard`
- ✅ Token is stored in localStorage
- ✅ No console errors

---

#### Test 1.2: User Login
**Steps:**
1. Navigate to `/login`
2. Enter credentials:
   - Email: "test@example.com"
   - Password: "password123"
3. Click "Sign in"

**Expected Backend Request:**
```http
POST http://localhost:8080/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

**Expected Backend Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Success Indicators:**
- ✅ User is redirected to `/dashboard`
- ✅ Token is stored in localStorage
- ✅ Header shows user profile

---

#### Test 1.3: Token Persistence
**Steps:**
1. After logging in, refresh the page (F5)

**Success Indicators:**
- ✅ User remains logged in
- ✅ Dashboard still loads
- ✅ No redirect to login page

---

#### Test 1.4: Logout
**Steps:**
1. Click user profile icon in header
2. Click "Logout"

**Success Indicators:**
- ✅ User is redirected to home page
- ✅ Token is removed from localStorage
- ✅ Header shows "Login" and "Get Started" buttons

---

### Phase 2: Workspace Tests

#### Test 2.1: Fetch Workspaces
**Steps:**
1. Log in to the application
2. Navigate to `/dashboard`

**Expected Backend Request:**
```http
GET http://localhost:8080/api/workspaces
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Backend Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Personal Projects",
    "description": "My personal workspace",
    "memberCount": 1
  },
  {
    "id": "507f1f77bcf86cd799439012",
    "name": "Work Projects",
    "description": "Work-related projects",
    "memberCount": 5
  }
]
```

**Success Indicators:**
- ✅ Workspaces load in the sidebar
- ✅ First workspace is selected by default
- ✅ Workspace name displays in the UI

---

#### Test 2.2: Create Workspace
**Steps:**
1. Click "Create Workspace" button
2. Fill in workspace details:
   - Name: "Test Workspace"
   - Description: "For testing purposes"
3. Click "Create"

**Expected Backend Request:**
```http
POST http://localhost:8080/api/workspaces
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "name": "Test Workspace",
  "description": "For testing purposes"
}
```

**Expected Backend Response:**
```json
{
  "id": "507f1f77bcf86cd799439013",
  "name": "Test Workspace",
  "description": "For testing purposes",
  "memberCount": 1
}
```

**Success Indicators:**
- ✅ New workspace appears in sidebar
- ✅ User is switched to new workspace
- ✅ Success message displayed

---

#### Test 2.3: Fetch Workspace Members
**Steps:**
1. Select a workspace
2. Open "Create Task" modal
3. Click on the assignee field

**Expected Backend Request:**
```http
GET http://localhost:8080/api/workspaces/507f1f77bcf86cd799439011/members
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Backend Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com"
  },
  {
    "id": "507f1f77bcf86cd799439014",
    "name": "Jane Doe",
    "email": "jane@example.com"
  }
]
```

**Success Indicators:**
- ✅ Team members appear in dropdown
- ✅ Current user appears first
- ✅ Search functionality works

---

### Phase 3: Task Tests

#### Test 3.1: Fetch Workspace Tasks
**Steps:**
1. Navigate to Team Tasks page
2. Select a workspace

**Expected Backend Request:**
```http
GET http://localhost:8080/api/workspaces/507f1f77bcf86cd799439011/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Backend Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439015",
    "title": "Design new landing page",
    "description": "Create a modern landing page",
    "priority": "high",
    "status": "inprogress",
    "dueDate": "2026-01-15T00:00:00.000Z",
    "assignedUser": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Test User",
      "email": "test@example.com"
    },
    "workspaceId": "507f1f77bcf86cd799439011"
  }
]
```

**Success Indicators:**
- ✅ Tasks display in table
- ✅ Task details are correct
- ✅ Loading state disappears

---

#### Test 3.2: Create Task
**Steps:**
1. Click "Add Task" button
2. Fill in task details:
   - Task Name: "Test Task"
   - Description: "This is a test task"
   - Priority: "High"
   - Status: "To Do"
   - Due Date: Select a future date
   - Assignee: Select a team member
3. Click "Create Task"

**Expected Backend Request:**
```http
POST http://localhost:8080/api/workspaces/507f1f77bcf86cd799439011/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "title": "Test Task",
  "description": "This is a test task",
  "priority": "high",
  "status": "todo",
  "dueDate": "2026-01-15",
  "assignees": ["test@example.com"]
}
```

**Expected Backend Response:**
```json
{
  "id": "507f1f77bcf86cd799439016",
  "title": "Test Task",
  "description": "This is a test task",
  "priority": "high",
  "status": "todo",
  "dueDate": "2026-01-15T00:00:00.000Z",
  "assignedUser": {
    "id": "507f1f77bcf86cd799439011",
    "name": "Test User",
    "email": "test@example.com"
  },
  "workspaceId": "507f1f77bcf86cd799439011"
}
```

**Success Indicators:**
- ✅ Modal closes
- ✅ New task appears in task list
- ✅ Success message displayed

---

#### Test 3.3: Fetch User Tasks
**Steps:**
1. Navigate to "My Tasks" page

**Expected Backend Request:**
```http
GET http://localhost:8080/api/tasks
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Expected Backend Response:**
```json
[
  {
    "id": "507f1f77bcf86cd799439015",
    "title": "Design new landing page",
    "description": "Create a modern landing page",
    "priority": "high",
    "status": "inprogress",
    "dueDate": "2026-01-15T00:00:00.000Z",
    "assignedUser": {
      "id": "507f1f77bcf86cd799439011",
      "name": "Test User",
      "email": "test@example.com"
    },
    "workspaceId": "507f1f77bcf86cd799439011"
  }
]
```

**Success Indicators:**
- ✅ Only tasks assigned to current user are shown
- ✅ Tasks from all workspaces are included
- ✅ Filters work correctly

---

#### Test 3.4: Update Task Status
**Steps:**
1. View tasks in Team Tasks
2. Click on task status dropdown
3. Change status to "In Progress"

**Expected Backend Request:**
```http
PATCH http://localhost:8080/api/tasks/507f1f77bcf86cd799439015/status
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

{
  "status": "inprogress"
}
```

**Success Indicators:**
- ✅ Task status updates in UI
- ✅ Status badge color changes
- ✅ No errors in console

---

### Phase 4: Error Handling Tests

#### Test 4.1: Invalid Credentials
**Steps:**
1. Navigate to `/login`
2. Enter incorrect credentials
3. Click "Sign in"

**Success Indicators:**
- ✅ Error message displays
- ✅ User is NOT redirected
- ✅ Form can be retried

---

#### Test 4.2: Expired Token
**Steps:**
1. Manually set an expired token in localStorage
2. Try to access protected routes

**Success Indicators:**
- ✅ 401 error is caught
- ✅ User is redirected to `/login`
- ✅ Token is cleared from localStorage

---

#### Test 4.3: Backend Unavailable
**Steps:**
1. Stop the Spring Boot server
2. Try to create a task

**Success Indicators:**
- ✅ Error message displays
- ✅ Loading state ends
- ✅ Connection error shown

---

## Browser Console Testing

Open browser DevTools (F12) and check:

### Network Tab
- All API requests go to `http://localhost:8080/api/*`
- Authorization header is present: `Bearer <token>`
- Response status codes are appropriate (200, 201, 400, 401, etc.)

### Console Tab
- No unhandled Promise rejections
- No CORS errors
- No missing dependencies warnings

### Application Tab → Local Storage
- Token is stored under key `"token"`
- Token is cleared on logout

---

## Common Issues & Solutions

### Issue 1: CORS Error
**Symptom:** 
```
Access to XMLHttpRequest at 'http://localhost:8080/api/auth/login' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solution:**
Add CORS configuration in Spring Boot (see above)

---

### Issue 2: 401 Unauthorized
**Symptom:**
```
POST http://localhost:8080/api/workspaces 401 (Unauthorized)
```

**Solution:**
- Check JWT token is valid
- Verify Authorization header format: `Bearer <token>`
- Check backend JWT validation logic

---

### Issue 3: Network Error
**Symptom:**
```
AxiosError: Network Error
net::ERR_CONNECTION_REFUSED
```

**Solution:**
- Verify Spring Boot is running on port 8080
- Check MongoDB is running and connected
- Verify firewall is not blocking connections

---

### Issue 4: Empty Response Data
**Symptom:**
Tasks, workspaces, or users are empty arrays

**Solution:**
- Check MongoDB has data
- Verify user is authenticated
- Check backend query logic

---

## MongoDB Data Verification

Use MongoDB Compass or CLI to verify data:

```javascript
// Check users collection
db.users.find()

// Check workspaces collection
db.workspaces.find()

// Check tasks collection
db.tasks.find()
```

---

## Quick Test Script

Run this in browser console to quickly test API endpoints:

```javascript
// Test 1: Check if backend is running
fetch('http://localhost:8080/api/health')
  .then(res => console.log('Backend running:', res.ok))
  .catch(err => console.log('Backend offline:', err));

// Test 2: Check if token exists
console.log('Token exists:', !!localStorage.getItem('token'));

// Test 3: Test authenticated request
fetch('http://localhost:8080/api/workspaces', {
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  }
})
  .then(res => res.json())
  .then(data => console.log('Workspaces:', data))
  .catch(err => console.log('Error:', err));
```

---

## Success Criteria

The integration is successful if:

- [x] All authentication flows work (register, login, logout)
- [x] Workspaces load and can be created
- [x] Tasks load and can be created
- [x] Workspace members load in assignee dropdown
- [x] User tasks load on My Tasks page
- [x] Status filters work correctly
- [x] Error handling works gracefully
- [x] No CORS errors in console
- [x] No network errors in console

---

**Report Date:** January 10, 2026
**Frontend:** React + Vite on port 5173
**Backend:** Spring Boot on port 8080
**Database:** MongoDB
