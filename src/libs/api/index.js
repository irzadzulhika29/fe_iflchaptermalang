import axios from "axios";

export const globalAPI = "https://experientially-unchallenging-amelie.ngrok-free.dev/api/v1";

const API = axios.create({
  baseURL: `${globalAPI}`,
  headers: {
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
    "ngrok-skip-browser-warning": "true",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
