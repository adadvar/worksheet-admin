import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

const axiosInstanceWithAuth = axios.create({
  baseURL: import.meta.env.VITE_API_URL + "/api",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosInstanceWithAuth.interceptors.request.use(
  (config) => {
    const user = JSON.parse(localStorage.getItem("user") as string);
    const token = user.token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosInstance, axiosInstanceWithAuth };
