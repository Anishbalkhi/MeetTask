import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { loginApi, registerApi } from "../api/authApi";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext();

// Mock mode for testing without backend
const MOCK_MODE = true; // Set to true for mock mode, false for backend integration

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    MOCK_MODE ? "mock-token-123" : localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  // Fetch user data when token changes (if needed)
  useEffect(() => {
    if (MOCK_MODE && token) {
      // Use first mock user as logged in user
      const mockUser = mockUsers[0];
      setUser({
        loggedIn: true,
        ...mockUser,
        avatar: `https://ui-avatars.com/api/?name=${mockUser.name.replace(' ', '+')}&background=random`
      });
    } else if (token) {
      setUser({ loggedIn: true });
      // TODO: Optionally fetch user details from /api/auth/me or similar
    } else {
      setUser(null);
    }
  }, [token]);

  const login = useCallback(async (email, password) => {
    if (MOCK_MODE) {
      setToken("mock-token-123");
      return { success: true };
    }

    const response = await loginApi({ email, password });
    const jwtToken = response.data.token;
    localStorage.setItem("token", jwtToken);
    setToken(jwtToken);
    return response;
  }, []);

  const register = useCallback(async (name, email, password) => {
    if (MOCK_MODE) {
      return { success: true };
    }

    const response = await registerApi({ name, email, password });
    // Note: Register may or may not return a token immediately
    // Depending on if email verification is required
    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
      setToken(response.data.token);
    }
    return response;
  }, []);

  const logout = useCallback(() => {
    if (!MOCK_MODE) {
      localStorage.removeItem("token");
    }
    setToken(null);
    setUser(null);
  }, []);

  // Listen for logout events from axios interceptor
  useEffect(() => {
    const handleLogout = () => {
      logout();
    };

    window.addEventListener("auth:logout", handleLogout);
    return () => window.removeEventListener("auth:logout", handleLogout);
  }, [logout]);

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
