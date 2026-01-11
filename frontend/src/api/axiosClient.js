import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  timeout: 5000 // 5 second timeout to prevent hanging requests
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
    // Handle timeout
    if (error.code === 'ECONNABORTED') {
      console.warn('⚠️ Request timeout - backend may be unavailable');
    }
    
    // Handle connection refused / network errors
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.warn('⚠️ Backend connection failed - check if server is running on http://localhost:8080');
    }
    
    // Handle 401 errors (unauthorized)
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
