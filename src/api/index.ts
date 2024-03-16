import axios from "axios";
export const BASE_URL = "http://localhost:8081/api/v1";

const publicApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const axiosApi = axios.create({
  baseURL: BASE_URL,
});

// Add a request interceptor
axiosApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosApi, publicApi };
