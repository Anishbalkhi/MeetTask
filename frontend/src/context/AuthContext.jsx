import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { loginApi, registerApi } from "../api/authApi";
import { mockUsers } from "../data/mockData";

const AuthContext = createContext();

const MOCK_MODE = true;

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    MOCK_MODE ? "mock-token-123" : localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (MOCK_MODE && token) {

      const mockUser = mockUsers[0];
      setUser({
        loggedIn: true,
        ...mockUser,
        avatar: `https://ui-avatars.com/api/?name=${mockUser.name.replace(' ', '+')}&background=random`
      });
    } else if (token) {
      setUser({ loggedIn: true });

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
