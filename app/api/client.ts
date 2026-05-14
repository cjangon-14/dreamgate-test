import axios from "axios";

const getBaseURL = () => {
  if (import.meta.env.VITE_API_URL) {
    return import.meta.env.VITE_API_URL;
  }
  
  if (typeof window !== "undefined") {
    // Browser environment
    const isLocalhost = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocalhost) {
      return "http://localhost:3005/api/client/v1";
    }
    // Production: use same origin
    return `${window.location.origin}/api/client/v1`;
  }
  
  // Server-side fallback
  return "http://localhost:3005/api/client/v1";
};

export const apiClient = axios.create({
  baseURL: getBaseURL(),
  headers: {
    "Content-Type": "application/json",
  },
});
