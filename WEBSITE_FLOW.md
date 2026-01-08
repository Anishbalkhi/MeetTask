# MeetTask Website - Complete User Flow Documentation

**Project**: MeetTask - AI-Powered Meeting & Task Management Platform  
**Date**: January 8, 2026  
**Version**: 1.0  

---

## Table of Contents

1. [Overview](#overview)
2. [User Journey Map](#user-journey-map)
3. [Detailed Flow Breakdown](#detailed-flow-breakdown)
4. [Route Structure](#route-structure)
5. [Page Descriptions](#page-descriptions)
6. [Key Features](#key-features)

---

## Overview

MeetTask is a comprehensive project management application that combines meeting management with task tracking. The platform enables teams to conduct meetings, generate AI transcripts, create tasks, and collaborate effectively.

### Core Capabilities
- **Authentication System**: Full user registration, login, email verification, and password reset
- **Workspace Management**: Create and manage multiple workspaces with team members
- **Task Management**: Personal and team task tracking with multiple views (Grid/List)
- **Team Collaboration**: Invite members via email or shareable links
- **Role-Based Access**: Admin and member roles with appropriate permissions

---

## User Journey Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE (/)                             │
│  • Hero Section with Value Proposition                              │
│  • Feature Overview                                                  │
│  • Call-to-Actions: "Start for Free" / "Login"                      │
└────────────────────┬────────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┐
        │                         │
        ▼                         ▼
┌──────────────┐          ┌──────────────┐
│   REGISTER   │          │    LOGIN     │
│   /register  │          │    /login    │
└──────┬───────┘          └──────┬───────┘
       │                         │
       ▼                         │
┌──────────────┐                 │
│ VERIFY INFO  │                 │
│ /verify-info │                 │
└──────┬───────┘                 │
       │                         │
       ▼                         │
┌──────────────┐                 │
│ VERIFY EMAIL │                 │
│/verify-email │                 │
└──────┬───────┘                 │
       │                         │
       └────────┬────────────────┘
                │
                ▼
┌───────────────────────────────────────────────────────────────────┐
│                    DASHBOARD (/dashboard)                         │
│                  MainLayout (Header + Sidebar)                    │
└────────────────────┬──────────────────────────────────────────────┘
                     │
        ┌────────────┼────────────┬────────────────┐
        │            │            │                │
        ▼            ▼            ▼                ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────────────┐
│USER HOME │  │TEAM HOME │  │WORKSPACE │  │CREATE WORKSPACE  │
│/dashboard│  │/dashboard│  │/dashboard│  │/dashboard/       │
│   /home  │  │  /team   │  │/workspace│  │create-workspace  │
└──────────┘  └──────────┘  └──────────┘  └──────────────────┘
```

---

## Detailed Flow Breakdown

### 1. **Pre-Authentication Flow**

#### A. Landing Page (`/`)
**Purpose**: First impression and user acquisition

**Elements**:
- **Navigation Bar**:
  - MeetTask logo (clickable → home)
  - Login link (→ `/login`)
  - "Get Started" button (→ `/register`)
  - If authenticated: Shows "Dashboard" link and "Logout" button

- **Hero Section**:
  - Tagline: "Meet. Decide. Assign. All in one place."
  - Value proposition about AI transcripts and task management
  - CTA buttons:
    - "Start for Free" → `/register`
    - "Watch Demo" (placeholder)
  - Hero image showcasing the platform

- **Features Section**:
  - **Live Transcripts**: AI captures meeting conversations
  - **AI Task Suggestions**: Auto-convert discussions to tasks
  - **Instant Assignment**: Assign tasks during meetings

- **CTA Section**:
  - Secondary call-to-action with team collaboration image
  - "Get Started Free" button → `/register`

- **Footer**:
  - Copyright notice

**User Actions**:
- Navigate to `/login` or `/register`
- View features and value proposition
- Decide to sign up

---

#### B. Registration Flow (`/register`)
**Purpose**: Create new user account

**Elements**:
- Full-page form with gradient background and animated blobs
- Fields:
  - Email address (required)
  - Password (required)
  - Confirm Password (required)
- Terms & conditions checkbox
- "Create Account" button
- Link to `/login` for existing users

**Process**:
1. User fills out registration form
2. Frontend validates inputs (matching passwords, email format)
3. On successful registration → redirects to `/verify-info` (with email state)
4. Verification email sent to user's inbox

**Design**: Light theme with purple-to-blue gradient, white card with shadow, clean modern UI

---

#### C. Verify Info Page (`/verify-info`)
**Purpose**: Inform user to check email for verification

**Elements**:
- Email icon with animation
- Heading: "Check Your Email"
- Message explaining verification process
- Display registered email address
- Tips for if email not received (check spam, etc.)
- "Back to Sign In" button → `/login`
- "Already verified? Sign in here" link

**User Actions**:
- Check email inbox for verification link
- Click verification link (leads to `/verify-email`)
- Return to login page

---

#### D. Verify Email Page (`/verify-email`)
**Purpose**: Complete email verification via token

**Process**:
1. User clicks link in email with verification token
2. Page extracts token from URL query params
3. Sends verification request to backend
4. Shows success/error message
5. Auto-redirects to `/login` after 3 seconds on success

**Elements**:
- Loading spinner during verification
- Success message with checkmark icon
- Error message if token invalid/expired
- Auto-redirect countdown

---

#### E. Login Page (`/login`)
**Purpose**: Authenticate existing users

**Elements**:
- Login form with gradient background
- Fields:
  - Email address
  - Password
- "Remember me" checkbox
- "Sign In" button
- "Forgot Password?" link → `/forgot-password`
- "Don't have an account? Sign up" link → `/register`

**Process**:
1. User enters credentials
2. On success → Auth token stored, redirect to `/dashboard/home`
3. On failure → Error message displayed

**Design**: Matches registration page aesthetic

---

#### F. Forgot Password Flow (`/forgot-password`)
**Purpose**: Initiate password reset

**Elements**:
- Email input field
- "Send Reset Link" button
- Success message after submission
- Link back to `/login`

**Process**:
1. User enters email
2. Reset link sent to email
3. Link contains token → `/reset-password?token=xxx`

---

#### G. Reset Password Page (`/reset-password`)
**Purpose**: Set new password using reset token

**Elements**:
- New password field
- Confirm password field
- "Reset Password" button
- Token extracted from URL

**Process**:
1. User enters new password (twice)
2. Validates token and updates password
3. Redirects to `/login` on success

---

### 2. **Post-Authentication Flow (Dashboard Area)**

All dashboard routes are wrapped in the **MainLayout** component which provides:
- **Sidebar** (left, 72px wide, fixed)
  - Navigation icons for:
    - Home (User tasks)
    - Team (Workspace tasks)
    - Workspace Settings
    - Create Workspace
  - Workspace switcher at bottom
  
- **Header** (top bar)
  - Current page title/breadcrumbs
  - Workspace selector dropdown
  - User profile dropdown
  - Notifications icon
  - Search functionality

---

#### A. User Home (`/dashboard` or `/dashboard/home`)
**Purpose**: View and manage personal tasks across all workspaces

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ Header: "My Tasks" | Task Count | [+ New Task Button]      │
├─────────────────────────────────────────────────────────────┤
│ Filters: [All] [To Do] [In Progress] [Completed]           │
│ View Toggle: [List View] [Grid View]                        │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Task Cards/List Items displayed here]                     │
│                                                              │
│  - Task Title                                                │
│  - Description                                               │
│  - Status badge (To Do, In Progress, Completed)             │
│  - Priority indicator                                        │
│  - Due date                                                  │
│  - Assigned workspace                                        │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Features**:
- Filter by status (All, To Do, In Progress, Completed)
- Toggle between Grid and List views
- Create new personal tasks via modal
- View tasks from all workspaces user belongs to
- Click task to view details (future: task detail modal)

**Data Source**: `getUserTasks()` API - fetches all tasks assigned to current user

---

#### B. Team Home (`/dashboard/team`)
**Purpose**: View all tasks in the current workspace (team view)

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ Header: "Team Tasks" | Workspace Name | [+ New Task Button] │
├─────────────────────────────────────────────────────────────┤
│ Filters: [All Status] [To Do] [In Progress] [Completed]    │
│          [All Members ▼] (Dropdown to filter by assignee)   │
│ View Toggle: [List View] [Grid View]                        │
├─────────────────────────────────────────────────────────────┤
│ Task Statistics Cards:                                       │
│ ┌──────────┬──────────┬──────────┬──────────┐              │
│ │  Total   │  To Do   │In Progress│Completed │              │
│ │   12     │    4     │    5     │    3     │              │
│ └──────────┴──────────┴──────────┴──────────┘              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  [Team Task Cards/List Items]                               │
│                                                              │
│  - Shows assignee avatar/name                                │
│  - Task details                                              │
│  - Status and priority                                       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

**Features**:
- Filter by status AND assignee
- Statistical overview (Total, To Do, In Progress, Completed counts)
- Create workspace tasks
- View all team members' tasks
- Workspace-specific task list

**Data Source**: WorkspaceContext - `tasks` (fetched for current workspace)

---

#### C. Create Workspace (`/dashboard/create-workspace`)
**Purpose**: Set up a new workspace and invite team members

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ [Briefcase Icon] Create Workspace                    [X]    │
├─────────────────────────────────────────────────────────────┤
│ Workspace Name: *                                            │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ e.g. Engineering Team                                   │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                              │
│ Description: (Optional)                                      │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ What's this workspace for?                              │ │
│ └─────────────────────────────────────────────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ 📧 Add Colleagues by Email (Optional)                       │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ ellis@gmail.com, maria@gmail.com                        │ │
│ └─────────────────────────────────────────────────────────┘ │
│ ℹ️ Invitations expire in 30 days                            │
├─────────────────────────────────────────────────────────────┤
│ 🔗 Share Invitation Link                                    │
│ Anyone with this link can join your workspace               │
│ ┌──────────────────────────────────────┬─────────────────┐ │
│ │ https://meettask.com/invite/temp_... │ [📋 Copy Link] │ │
│ └──────────────────────────────────────┴─────────────────┘ │
├─────────────────────────────────────────────────────────────┤
│ [Skip this step]              [+ Create Workspace]          │
└─────────────────────────────────────────────────────────────┘
```

**Features**:
- Workspace name input (required)
- Optional description
- Email invitation field (comma-separated)
- Auto-generated invite link (available immediately)
- Copy link to clipboard functionality
- Skip option to create workspace without invites
- On submit → workspace created, invites sent, redirect to `/dashboard/home`

**Design**: Dark theme card (matches dashboard aesthetic)
- Black/dark gray background
- Blue/purple gradient accents
- White text with proper hierarchy

---

#### D. Workspace Settings (`/dashboard/workspace`)
**Purpose**: Manage current workspace configuration and members

**Layout**:
```
┌─────────────────────────────────────────────────────────────┐
│ [WS] Workspace Settings                                      │
│      Manage [Workspace Name]                                 │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────────────┬──────────────────────┐             │
│ │ 🔗 Invite Link       │ 👥 Current Members   │             │
│ │                      │    [5 Active]        │             │
│ │ Share this link to   │                      │             │
│ │ invite members       │ ┌──────────────────┐ │             │
│ │                      │ │ [A] user@email   │ │             │
│ │ [Copy Link]          │ │     MEMBER  [×]  │ │             │
│ │                      │ ├──────────────────┤ │             │
│ │                      │ │ [B] other@email  │ │             │
│ │                      │ │     MEMBER  [×]  │ │             │
│ │                      │ └──────────────────┘ │             │
│ └──────────────────────┴──────────────────────┘             │
├─────────────────────────────────────────────────────────────┤
│ ⚠️  DANGER ZONE                                              │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Delete Workspace                                        │ │
│ │ Once deleted, all data will be permanently removed      │ │
│ │                             [Delete Workspace]          │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

**Features**:
- **Invite Link Section**:
  - Display workspace invite URL
  - One-click copy to clipboard
  - "Copied!" confirmation feedback

- **Members List**:
  - Shows all workspace members
  - Email addresses with avatars
  - Member role badges
  - Remove member action (hover to reveal)
  - Fetched via `getWorkspaceMembers()` API

- **Danger Zone**:
  - Delete workspace button (red themed)
  - Two-step confirmation required
  - Warning about data loss

**Permissions**: Currently open to all members, but in production should be admin-only for destructive actions

---

### 3. **Shared Components & Modals**

#### A. Create Task Modal
**Triggered from**: User Home or Team Home page

**Fields**:
- Task title (required)
- Description (optional, textarea)
- Status dropdown (To Do, In Progress, Completed)
- Priority dropdown (Low, Medium, High)
- Due date picker
- Assignee selector (workspace members, if team task)

**Actions**:
- Cancel → closes modal
- Create Task → calls `createTask()` API, updates task list, closes modal

---

#### B. Workspace Switcher
**Location**: Bottom of sidebar

**Function**:
- Shows current workspace
- Click to open dropdown with all user's workspaces
- Select workspace → updates `currentWorkspace` in context
- Fetches new workspace data (tasks, members, etc.)

---

## Route Structure

```javascript
/                           → Home (Landing page)
/login                      → Login
/register                   → Register
/forgot-password            → Forgot Password
/reset-password             → Reset Password
/verify-info                → Email Verification Info
/verify-email               → Email Verification Handler

/dashboard                  → MainLayout wrapper
├── /                       → UserHome (default, same as /home)
├── /home                   → UserHome (Personal tasks)
├── /team                   → TeamHome (Workspace tasks)
├── /workspace              → WorkspaceSettings
└── /create-workspace       → CreateWorkspace
```

---

## Page Descriptions

### Public Pages (No Auth Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | Home | Landing page with features, hero section, CTAs |
| `/login` | Login | User authentication form |
| `/register` | Register | New user registration |
| `/forgot-password` | ForgotPassword | Password reset request |
| `/reset-password` | ResetPassword | Password reset with token |
| `/verify-info` | VerifyInfo | Email verification instructions |
| `/verify-email` | VerifyEmail | Email verification processor |

### Protected Pages (Auth Required)

| Route | Component | Description |
|-------|-----------|-------------|
| `/dashboard/home` | UserHome | Personal task dashboard |
| `/dashboard/team` | TeamHome | Team tasks for current workspace |
| `/dashboard/workspace` | WorkspaceSettings | Manage workspace settings & members |
| `/dashboard/create-workspace` | CreateWorkspace | Create new workspace form |

---

## Key Features

### 1. **Task Management**
- **Personal Tasks**: Accessible from User Home
- **Team Tasks**: Accessible from Team Home
- **Multiple Views**: Grid and List layouts
- **Filtering**: By status (To Do, In Progress, Completed)
- **Team Filtering**: Filter by assignee in team view
- **Statistics**: Quick overview of task distribution

### 2. **Workspace Management**
- **Multi-workspace Support**: Users can belong to multiple workspaces
- **Workspace Creation**: Easy setup with name and description
- **Member Invitations**: 
  - Email-based invites
  - Shareable invite links
- **Workspace Switcher**: Quick navigation between workspaces
- **Member Management**: View and remove workspace members
- **Workspace Deletion**: With confirmation (danger zone)

### 3. **Authentication & Security**
- **Email Verification**: Required for new accounts
- **Password Reset**: Secure token-based flow
- **Protected Routes**: Automatic redirect if not authenticated
- **JWT Tokens**: Stored and managed via AuthContext

### 4. **User Experience**
- **Responsive Design**: Works on mobile, tablet, desktop
- **Modern UI**: 
  - Light theme for public pages (purple-blue gradient)
  - Dark theme for dashboard
  - Smooth animations and transitions
- **Loading States**: Spinners and skeletons during data fetch
- **Empty States**: Helpful messages when no data
- **Micro-interactions**: Hover effects, button animations
- **Toast Notifications**: Success/error feedback (planned)

### 5. **Context Management**
- **AuthContext**: User authentication state, login/logout
- **WorkspaceContext**: 
  - Current workspace
  - Workspace list
  - Tasks for current workspace
  - Member data
  - Workspace switching logic

### 6. **Mock Mode**
- Development mode for testing without backend
- Mock data for workspaces, tasks, members
- Simulated API responses
- Allows full frontend testing

---

## User Flow Summary

### New User Journey:
1. Visit landing page (`/`)
2. Click "Get Started" → Register page
3. Create account → Verify Info page
4. Check email → Click verification link
5. Email verified → Login page
6. Sign in → Dashboard User Home
7. (Optional) Create workspace → Invite team
8. Create tasks and manage workspaces

### Returning User Journey:
1. Visit landing page or go directly to `/login`
2. Sign in with credentials
3. Land on Dashboard User Home
4. Switch workspace (if multiple)
5. Navigate to Team tasks or settings
6. Create/manage tasks
7. Invite new members
8. Manage workspace settings

---

## Technical Stack

**Frontend**:
- React 18
- React Router (for routing)
- Framer Motion (animations)
- React Icons (FiIcons)
- TailwindCSS (styling)
- Context API (state management)

**Authentication**: JWT tokens
**API Communication**: Axios (assumed)
**Design**: Custom CSS with Tailwind, gradient backgrounds, glassmorphism

---

## Future Enhancements (Not Yet Implemented)

- Meeting scheduling and video calls
- AI transcript generation during meetings
- Real-time collaboration features
- Task comments and activity logs
- File attachments on tasks
- Calendar view for tasks
- Notifications system
- Advanced role permissions (Admin, Member, Guest)
- Task templates
- Analytics and reporting
- Integration with external tools (Slack, Google Calendar)

---

**End of Documentation**

*Last Updated: January 8, 2026*
