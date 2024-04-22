import axios from 'axios';
import useAuth from './useAuth';
function useApi() {
    const { state } = useAuth()
    const BASE_URL = "http://localhost:8081/api/v1";
    const publicApi = axios.create({
        baseURL: BASE_URL,
        headers: {
            "Content-Type": "application/json",
        },
    });

    const axiosApi = axios.create({
        baseURL: BASE_URL,
    });

    axiosApi.interceptors.request.use(
        (config) => {
            const token = state && state.token ? state.token : ""
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );


    return {
        axiosApi, publicApi
    }
}

export default useApi