import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080/api",
  withCredentials: true,
  timeout: 5000 
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

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    
    if (error.code === 'ECONNABORTED') {
      console.warn('⚠️ Request timeout - backend may be unavailable');
    }
    
    
    if (error.message === 'Network Error' || error.code === 'ERR_NETWORK') {
      console.warn('⚠️ Backend connection failed - check if server is running on http://localhost:8080');
    }
    
    
    if (error.response?.status === 401) {
      
      localStorage.removeItem("token");
      
      window.dispatchEvent(new CustomEvent("auth:logout"));
      
      if (window.location.pathname !== "/login" && window.location.pathname !== "/register") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
