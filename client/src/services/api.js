import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

// Create Axios Instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

// Request Interceptor: Attach JWT Token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("admin_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Handle 401 Token Expiry
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // If token expired or invalid, clear storage
      const currentPath = window.location.pathname;
      if (localStorage.getItem("admin_token")) {
        localStorage.removeItem("admin_token");
        window.dispatchEvent(new Event("admin_logout"));
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Auth API Services
 */
export const loginAdmin = async (username, pin) => {
  const response = await api.post("/login", { username, pin });
  return response.data;
};

export const verifyAdminSession = async () => {
  const response = await api.get("/verify");
  return response.data;
};

/**
 * Student Responses API Services
 */
export const fetchAllResponses = async (params = {}) => {
  const response = await api.get("/", { params });
  return response.data;
};

export const fetchDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};

export const fetchResponsesByDepartment = async (department) => {
  const response = await api.get(`/departments/${encodeURIComponent(department)}`);
  return response.data;
};

export default api;
