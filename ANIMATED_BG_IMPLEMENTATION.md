# Quick Implementation Guide - Animated Background

## Apply to Each Page:

### 1. Add Import
```javascript
import AnimatedBackground from "../components/common/AnimatedBackground";
```

### 2. Replace Background
Find the main container div and add `AnimatedBackground` component:

```javascript
// OLD:
<div className="min-h-screen ...relative overflow-hidden">
  {/* Old background */}
  <div className="absolute ..."></div>
  
// NEW:
<div className="min-h-screen ...relative overflow-hidden">
  <AnimatedBackground />
```

### 3. Pages to Update:
- ✅ Home.jsx (already done)
- ⏳ Login.jsx  
- ⏳ Register.jsx
- ⏳ ForgotPassword.jsx
- ⏳ ResetPassword.jsx
- ⏳ VerifyEmail.jsx
- ⏳ VerifyInfo.jsx

### Quick Steps for Each:
1. Add import at line 5-6
2. Find line with `<div className="min-h-screen`
3. Add `<AnimatedBackground />` after that div
4. Remove old background div if present

That's it! The component handles all the animated elements automatically.
