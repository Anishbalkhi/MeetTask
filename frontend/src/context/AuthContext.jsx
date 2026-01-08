import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";

const AuthContext = createContext();

// Mock mode for testing without backend
const MOCK_MODE = true; // Set to false when backend is ready

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    MOCK_MODE ? "mock-token-123" : localStorage.getItem("token")
  );

  // Derive user state from token with mock data
  const user = useMemo(() => {
    if (MOCK_MODE) {
      return {
        loggedIn: true,
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://i.pravatar.cc/150?u=john"
      };
    }
    return token ? { loggedIn: true } : null;
  }, [token]);

  const login = useCallback((jwt) => {
    if (!MOCK_MODE) {
      localStorage.setItem("token", jwt);
    }
    setToken(jwt);
  }, []);

  const logout = useCallback(() => {
    if (!MOCK_MODE) {
      localStorage.removeItem("token");
    }
    setToken(null);
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
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
