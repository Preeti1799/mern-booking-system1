import axios from "axios";

const api = axios.create({
  baseURL: process.env.NODE_ENV === "development"
    ? "http://localhost:8800" // Should be this, not /api
    : "https://mern-booking-backend-sov6.vercel.app",
  withCredentials: true,
});

export default api;
