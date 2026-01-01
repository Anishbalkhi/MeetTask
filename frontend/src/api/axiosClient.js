import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 errors (token expiration/invalid)
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token is invalid or expired
      localStorage.removeItem("token");
      // Dispatch custom event to notify AuthContext
      window.dispatchEvent(new CustomEvent("auth:logout"));
      // Redirect to login if not already there
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
