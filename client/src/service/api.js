import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// ---------- Public client (no auth) ----------
export const publicApi = axios.create({
  baseURL: BASE_URL,
});

// ---------- Protected client (Bearer token attached) ----------
export const protectedApi = axios.create({
  baseURL: BASE_URL,
});

// Attach Bearer token to every protected request
protectedApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");

    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Global 401 handling
protectedApi.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("adminUser");

      if (!window.location.pathname.includes("/login")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(err);
  },
);
