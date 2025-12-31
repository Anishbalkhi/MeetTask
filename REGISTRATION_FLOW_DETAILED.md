# Registration Flow - Detailed Breakdown

## Complete Flow with Frontend Pages vs Backend Routes

---

## STEP 1: User Fills Registration Form

### 📄 **FRONTEND PAGE**
- **Route**: `/register`
- **Component**: `Register.jsx`
- **File Location**: `frontend/src/pages/Register.jsx`
- **What Happens**:
  - User sees registration form with 3 fields:
    - Full Name (text input)
    - Email (email input)
    - Password (password input)
  - Form has HTML5 validation (`required` attributes)
  - User types their information
  - Form state is managed with React `useState`

### 🔧 **Code Details**:
```javascript
// Frontend Component State
const [form, setForm] = useState({
  name: "",
  email: "",
  password: "",
});
```

---

## STEP 2: User Clicks "Create Account"

### 📄 **FRONTEND PAGE** (Same as Step 1)
- **Route**: `/register` (still on same page)
- **Component**: `Register.jsx`
- **What Happens**:
  1. Form submission is prevented (prevents page refresh)
  2. **Frontend Validation**: HTML5 checks if all fields are filled
  3. Loading state is activated (`setLoading(true)`)
  4. Button shows "Creating account..." and is disabled
  5. Error state is cleared
  6. `handleSubmit` function executes

### 🔧 **Code Details**:
```javascript
// Frontend: Register.jsx - handleSubmit function
const handleSubmit = async (e) => {
  e.preventDefault();  // Prevents page refresh
  if (loading) return; // Prevents double submission
  
  setError("");
  setLoading(true);
  await registerApi(form);  // API call happens here
  navigate("/verify-info", { state: { email: form.email } });
};
```

---

## STEP 3: Frontend Makes API Call

### 📡 **FRONTEND API CALL** → **BACKEND ROUTE**

#### **Frontend Side**:
- **Function**: `registerApi(form)`
- **File**: `frontend/src/api/authApi.js`
- **HTTP Method**: `POST`
- **Request Body**: 
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "userpassword123"
  }
  ```

#### **Backend Route**:
- **Endpoint**: `POST /auth/register`
- **Full URL**: `http://localhost:8080/api/auth/register`
- **Type**: 🔴 **BACKEND ROUTE** (Server-side)
- **What Backend Does**:
  1. Receives registration data
  2. Validates input (email format, password strength, etc.)
  3. Checks if email already exists in database
  4. If email exists → Returns error (409 Conflict or 400 Bad Request)
  5. If email is new → Creates user account with status: **UNVERIFIED**
  6. Generates a unique verification token
  7. Stores token in database with expiration time
  8. Sends verification email to user's email address
  9. Email contains link: `http://localhost:3000/verify-email?token={token}`
  10. Returns success response (200/201)

### 🔧 **Code Details**:
```javascript
// Frontend: authApi.js
export const registerApi = (data) =>
  axiosClient.post("/auth/register", data);

// Backend (expected behavior):
// POST /api/auth/register
// Request: { name, email, password }
// Response: 200 OK or 400/409 Error
```

---

## STEP 4: User Redirected to VerifyInfo Page

### 📄 **FRONTEND PAGE**
- **Route**: `/verify-info`
- **Component**: `VerifyInfo.jsx`
- **File Location**: `frontend/src/pages/VerifyInfo.jsx`
- **Route Definition**: `frontend/src/routes/AppRoutes.jsx` (Line 23)
- **What Happens**:
  1. User is automatically redirected from `/register` to `/verify-info`
  2. Email address is passed via route state
  3. Page displays:
     - Email icon (animated)
     - Heading: "Check Your Email"
     - Message: "We've sent a verification link..."
     - **User's email address** (displayed in highlighted box)
     - Troubleshooting tips
     - Links to go back to login

### 🔧 **Code Details**:
```javascript
// Frontend: Register.jsx - After successful API call
navigate("/verify-info", { state: { email: form.email } });

// Frontend: VerifyInfo.jsx - Receives email
const location = useLocation();
const email = location.state?.email;
```

**Note**: This is a **STATIC PAGE** - no backend call happens here. It's just showing information to the user.

---

## STEP 5: User Checks Email & Clicks Verification Link

### 📧 **EXTERNAL ACTION** (Email Client)
- **What Happens**:
  1. User opens their email inbox
  2. Finds email from your application
  3. Email contains a clickable link like:
     ```
     http://localhost:3000/verify-email?token=abc123xyz789
     ```
  4. User clicks the link
  5. Browser navigates to the verification page

**Note**: This happens outside your application (in email client), but the link points to your frontend.

---

## STEP 6: Email Verification Process

### 📄 **FRONTEND PAGE** → **BACKEND ROUTE**

#### **Frontend Page**:
- **Route**: `/verify-email?token={token}`
- **Component**: `VerifyEmail.jsx`
- **File Location**: `frontend/src/pages/VerifyEmail.jsx`
- **Route Definition**: `frontend/src/routes/AppRoutes.jsx` (Line 24)
- **What Happens**:
  1. Component mounts and `useEffect` runs immediately
  2. Extracts token from URL query parameter: `?token=abc123xyz789`
  3. **If no token**: Shows error → Redirects to `/login` after 3 seconds
  4. **If token exists**: Makes API call to verify email

#### **Frontend API Call**:
- **Function**: `verifyEmailApi(token)`
- **File**: `frontend/src/api/authApi.js`
- **HTTP Method**: `GET`
- **Request**: Token sent as query parameter

#### **Backend Route**:
- **Endpoint**: `GET /auth/verify-email?token={token}`
- **Full URL**: `http://localhost:8080/api/auth/verify-email?token=abc123xyz789`
- **Type**: 🔴 **BACKEND ROUTE** (Server-side)
- **What Backend Does**:
  1. Receives token from query parameter
  2. Looks up token in database
  3. **If token not found**: Returns 404/400 error
  4. **If token expired**: Returns 400/401 error
  5. **If token is valid**:
     - Finds user associated with token
     - Updates user status from **UNVERIFIED** → **VERIFIED**
     - Marks token as used (or deletes it)
     - Returns success response (200 OK)

### 🔧 **Code Details**:
```javascript
// Frontend: VerifyEmail.jsx
useEffect(() => {
  const token = params.get("token");  // Get token from URL
  if (!token) {
    // Show error, redirect to login
    return;
  }
  
  verifyEmailApi(token)  // API call
    .then(() => {
      // Success: Show success message
      // Redirect to /login after 2.5 seconds
    })
    .catch((error) => {
      // Error: Show error message
      // Redirect to /login after 3 seconds
    });
}, []);

// Frontend: authApi.js
export const verifyEmailApi = (token) =>
  axiosClient.get(`/auth/verify-email?token=${token}`);

// Backend (expected behavior):
// GET /api/auth/verify-email?token=abc123
// Response: 200 OK (account activated) or 400/404 Error
```

---

## STEP 7: User Redirected to Login

### 📄 **FRONTEND PAGE**
- **Route**: `/login`
- **Component**: `Login.jsx`
- **File Location**: `frontend/src/pages/Login.jsx`
- **Route Definition**: `frontend/src/routes/AppRoutes.jsx` (Line 19)
- **What Happens**:
  1. User is automatically redirected from `/verify-email` to `/login`
  2. User sees login form
  3. User can now enter their credentials (email & password)
  4. Account is now **VERIFIED** and active
  5. User can successfully login

**Note**: This is just a frontend page. The actual login happens when user submits the login form (which calls `POST /auth/login` backend route).

---

## Summary: Frontend Pages vs Backend Routes

### 📄 **FRONTEND PAGES** (React Components):
1. ✅ `/register` → `Register.jsx` - Registration form
2. ✅ `/verify-info` → `VerifyInfo.jsx` - "Check your email" info page
3. ✅ `/verify-email?token={token}` → `VerifyEmail.jsx` - Email verification page
4. ✅ `/login` → `Login.jsx` - Login form

### 🔴 **BACKEND ROUTES** (API Endpoints):
1. ✅ `POST /api/auth/register` - Creates account, sends verification email
2. ✅ `GET /api/auth/verify-email?token={token}` - Verifies email, activates account

---

## Visual Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    REGISTRATION FLOW                         │
└─────────────────────────────────────────────────────────────┘

USER ACTION          FRONTEND PAGE          BACKEND ROUTE
─────────────────────────────────────────────────────────────

1. Visit /register
   └─> [Register.jsx] 📄
       (Form displayed)

2. Fill form & click "Create Account"
   └─> [Register.jsx] 📄
       (Form validation)

3. API call triggered
   └─> registerApi() 📡 ──> POST /auth/register 🔴
       (Creates account, sends email)

4. Redirect to /verify-info
   └─> [VerifyInfo.jsx] 📄
       (Shows "Check your email")

5. User checks email & clicks link
   └─> (External: Email client)

6. Navigate to /verify-email?token=xyz
   └─> [VerifyEmail.jsx] 📄
       └─> verifyEmailApi() 📡 ──> GET /auth/verify-email?token=xyz 🔴
           (Verifies token, activates account)

7. Redirect to /login
   └─> [Login.jsx] 📄
       (User can now login)
```

---

## Key Files Reference

### Frontend Files:
- `frontend/src/pages/Register.jsx` - Registration form component
- `frontend/src/pages/VerifyInfo.jsx` - Email check info page
- `frontend/src/pages/VerifyEmail.jsx` - Email verification page
- `frontend/src/pages/Login.jsx` - Login form component
- `frontend/src/routes/AppRoutes.jsx` - Route definitions
- `frontend/src/api/authApi.js` - API functions
- `frontend/src/api/axiosClient.js` - Axios configuration

### Backend Routes (Expected):
- `POST /api/auth/register` - Registration endpoint
- `GET /api/auth/verify-email?token={token}` - Email verification endpoint

---

## Important Notes

1. **Frontend Pages** are React components that render UI in the browser
2. **Backend Routes** are API endpoints that process data on the server
3. **API Calls** are HTTP requests from frontend to backend
4. **Navigation** happens on the frontend (React Router)
5. **Email sending** happens on the backend (server-side)
6. **Token verification** happens on the backend (server-side)
7. **Account activation** happens on the backend (database update)

---

## Testing Checklist

- [ ] User can access `/register` page
- [ ] Form validation works (required fields)
- [ ] API call to `POST /auth/register` succeeds
- [ ] User redirected to `/verify-info` after registration
- [ ] Email address displays on VerifyInfo page
- [ ] Verification email is received
- [ ] Clicking email link opens `/verify-email?token={token}`
- [ ] API call to `GET /auth/verify-email?token={token}` succeeds
- [ ] Account is activated in database
- [ ] User redirected to `/login` after verification
- [ ] User can login with verified account

