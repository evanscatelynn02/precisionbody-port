import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// AUTO ATTACH TOKEN TO EVERY REQUEST
API.interceptors.request.use((config) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser?.token) {
    config.headers.Authorization = `Bearer ${storedUser.token}`;
  }

  return config;
});

export default API;