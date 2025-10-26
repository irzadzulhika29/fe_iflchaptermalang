import axios from "axios";

const token = localStorage.getItem("token");

// change this to your API base URL that you want to use (Deployed API URL)
export const globalAPI = "https://admin.iflchaptermalang.org/api/v1";

const API = axios.create({
  baseURL: `${globalAPI}`,
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

export default API;
