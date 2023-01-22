import axios, { AxiosError, AxiosResponse } from "axios";
import { AuthRequest, AuthResponse, Status } from "./interfaces/auth_interface";

const API = axios.create({
  baseURL: "http://localhost:3001/api/v1/auth",
  withCredentials: true,
});
const handleAuthSuccess = (
  response: AxiosResponse<AuthResponse>,
  request: AuthRequest
) => {
  const json = response.data;
  return request.onSuccess(json);
};
const handleAuthError = (error: any, request: AuthRequest) => {
  if (error instanceof AxiosError) {
    if (error.response === null) {
      return request.onError({
        message: "Could not connect to Nappy server.",
        status: Status.ERROR,
      });
    }
    const json = error.response?.data;
    if (json) {
      return request.onError({
        message: json.message as string,
        status: json.status as Status,
      });
    }
    return request.onError({
      message: "Could not connect to Nappy servers.",
      status: Status.ERROR,
    });
  }
  return request.onError({
    message: "Something went wrong. Try again or contact with support.",
    status: Status.ERROR,
  });
};

export const signup = async (request: AuthRequest) => {
  try {
    const response = await API.post<AuthResponse>(
      "/signup",
      {
        email: request.email,
        password: request.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return handleAuthSuccess(response, request);
  } catch (error) {
    return handleAuthError(error, request);
  }
};
export const login = async (request: AuthRequest) => {
  try {
    const response = await API.post<AuthResponse>(
      "/login",
      {
        email: request.email,
        password: request.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return handleAuthSuccess(response, request);
  } catch (error) {
    return handleAuthError(error, request);
  }
};
