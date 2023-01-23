import axios from "axios";

export const AuthAPI = axios.create({
  baseURL: "http://localhost:3001/api/v1/auth",
  withCredentials: true,
});
