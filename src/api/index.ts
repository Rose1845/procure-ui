// import axios from "axios";

// const devBaseURL = import.meta.env.VITE_DEV_API_URL;
// const prodBaseURL = import.meta.env.VITE_PROD_API_URL;
// const env = import.meta.env.MODE;

// const baseURL = env === "development" ? devBaseURL : prodBaseURL;
// const wsBaseURL = env === "development" ? devBaseURL : prodBaseURL;
// // Extract ws from http
// export const wsURL = wsBaseURL.replace("http", "ws") as string;

// const publicApi = axios.create({
//   baseURL: baseURL + "/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// const privateApi = axios.create({
//   baseURL: baseURL + "/api/v1",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// privateApi.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     if (token) {
//       // config.headers!.set=('authorization',`Bearer ${token}`) //= ;
//     }
//     // Check if token is
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// privateApi.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response.status === 401) {
//       localStorage.removeItem("token");
//       window.location.href = "/login";
//     }
//     // Check if user is not authorized
//     if (error.response.status === 403) {
//       // Refresh token
//       const refreshToken = localStorage.getItem('refreshToken');

//       return Promise.reject(error);
//     }
//   }
// );

// export { publicApi, privateApi };

import axios from "axios";
const BASE_URL = "http://localhost:8081/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});