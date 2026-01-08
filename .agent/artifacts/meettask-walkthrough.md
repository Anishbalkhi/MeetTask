# MeetTask Frontend Walkthrough

## 1. Project Overview
**MeetTask** is a React-based project management application built with:
- **Core:** React 19, Vite
- **Styling:** TailwindCSS v4
- **Routing:** React Router v7
- **HTTP Client:** Axios with interceptors
- **Animations:** Framer Motion

The application currently features a complete authentication flow and a basic dashboard shell, with several other feature-specific pages present in the codebase but not currently integrated into the main routing.

## 2. Directory Structure (`frontend/src`)

```
src/
├── api/                # API integration
│   ├── axiosClient.js  # Base axios instance with interceptors
│   ├── authApi.js      # Authentication endpoints
│   ├── meetingApi.js   # Meeting-related endpoints
│   ├── taskApi.js      # Task-related endpoints
│   └── workspaceApi.js # Workspace-related endpoints
├── assets/             # Static assets
├── components/         # Reusable UI components
│   └── layout/         # Layout components (Header, Sidebar, ProtectedRoute)
├── context/            # React Contexts
│   └── AuthContext.jsx # Authentication state management
├── hooks/              # Custom React hooks
├── pages/              # Page components
│   ├── Dashboard.jsx   # Main protected dashboard view
│   ├── Home.jsx        # Landing page
│   ├── Login.jsx       # Sign in page
│   ├── Register.jsx    # Sign up page
│   └── [Others]        # Various other pages (some currently unused)
├── routes/             # App Routing configuration
│   └── AppRoutes.jsx   # Central route definitions
├── App.jsx             # Root component
└── main.jsx            # Entry point
```

## 3. Key Features & Implementation

### A. Authentication & State
- **AuthContext (`context/AuthContext.jsx`):**
  - Manages the authentication state using `localStorage` for token persistence.
  - Provides `login(jwt)` and `logout()` methods to the app.
  - Automatically listens for a custom window event `auth:logout` to sync state if the API reports an expired token.

- **Axios Interceptors (`api/axiosClient.js`):**
  - **Request:** Automatically attaches the JWT from `localStorage` as a `Bearer` token to every outgoing request.
  - **Response:** Global error handling checks for `401 Unauthorized` responses. If caught, it emits the `auth:logout` event and redirects the user to the login page.

### B. Routing & Navigation
- **Router:** Configuring using `react-router-dom`.
- **Public Routes:**
  - `/`: Home/Landing
  - `/login`, `/register`: Auth entry points
  - `/forgot-password`, `/reset-password`: Account recovery
  - `/verify-email`, `/verify-info`: Account verification
- **Protected Routes:**
  - `/dashboard`: The main application area. This route is wrapped in `<ProtectedRoute>`, ensuring only authenticated users can access it.

### C. Current UI State
- **Dashboard (`pages/Dashboard.jsx`):**
  - Currently a placeholder interface.
  - Features a top navigation bar with a "Logout" button.
  - Displays a simple "Welcome to your dashboard!" message.

### D. Unlinked/Dormant Features
The `src/pages` directory contains several components that are **not currently active** in `AppRoutes.jsx` or are only partially implemented, including:
- `CreateMeeting.jsx`
- `CreateWorkspace.jsx`
- `Workspace.jsx`
- `TeamHome.jsx`
- `UserHome.jsx`

These files suggest upcoming features for Workspace creation, Meeting schedulers, and Team management views that are ready to be integrated.

## 4. Development Workflow
- **Run Locally:** `npm run dev` (starts Vite server)
- **Build:** `npm run build`
- **Lint:** `npm run lint`

## 5. Next Steps for Development
To bring the application to the next level, the following steps are recommended:
1.  **Integrate Dormant Pages:** Connect `CreateWorkspace`, `Workspace`, and `CreateMeeting` to the router.
2.  **Enhance Dashboard:** Replace the placeholder Dashboard with a real UI that links to Workspaces and Teams.
3.  **Backend Connection:** Ensure the `api/*.js` functions are fully aligned with the backend endpoints (currently pointing to `localhost:8080`).
