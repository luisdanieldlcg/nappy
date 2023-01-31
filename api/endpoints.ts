import axios from "axios";

const API_URL = "http://localhost:3001/api/v1/";

export const AuthEndpoint = axios.create({
  baseURL: API_URL + "auth",
  withCredentials: true,
});

export class ErrorResponse {
  message: string;
  statusCode: number;
}
