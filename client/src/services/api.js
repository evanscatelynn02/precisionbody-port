import axios from "axios";

const API = axios.create({
  baseURL: "https://precisionbody-port-service.onrender.com/api",
});

export default API;