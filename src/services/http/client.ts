import axios, { AxiosError } from "axios";
import { clearAuthSession, getAuthToken } from "@/lib/auth/session";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

if (!baseURL) {
  throw new Error("Missing NEXT_PUBLIC_API_URL. Set it in .env.local.");
}

const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401 && typeof window !== "undefined") {
      clearAuthSession();
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export { apiClient };
