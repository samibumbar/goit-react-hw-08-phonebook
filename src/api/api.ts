import axios from "axios";

const api = axios.create({
  baseURL: "https://connections-api.goit.global/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
