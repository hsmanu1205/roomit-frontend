import axios from "axios";

const api = axios.create({
  baseURL: "https://roomit-backend-z03a.onrender.com/api",
});

export default api;