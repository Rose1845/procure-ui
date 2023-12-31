// axiosInterceptor.ts
import axios from "axios";
import useAuth from "../hooks/useAuth";

const setupAxiosInterceptor = () => {
  const auth = useAuth();

  axios.interceptors.request.use(
    (config) => {
      const token = auth.getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default setupAxiosInterceptor;
