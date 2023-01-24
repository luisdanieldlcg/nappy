import { AuthAPI } from "~/api/API";
import { AxiosError } from "axios";
import {
  LoginRequest,
  AuthResponse,
  RawRequest,
  RawResponse,
  serverError,
  SignupRequest,
} from "~/api/interfaces";

export const useAuthStore = defineStore("auth", () => {
  const login = async (request: LoginRequest) => {
    try {
      const response = await AuthAPI.post<AuthResponse>(
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
      const json = response.data;
      return request.onSuccess(json);
    } catch (error) {
      return handleAuthError(error, request);
    }
  };

  const signup = async (request: SignupRequest) => {
    try {
      const response = await AuthAPI.post<AuthResponse>(
        "/signup",
        {
          email: request.email,
          password: request.password,
          passwordConfirm: request.passwordConfirm,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const json = response.data;
      return request.onSuccess(json);
    } catch (error) {
      return handleAuthError(error, request);
    }
  };

  const verifyAuth = async (request: RawRequest) => {
    try {
      console.log("verify");
      const response = await AuthAPI.get<RawResponse>("/verify");
      const json = response.data;
      return request.onSuccess(json);
    } catch (error) {
      return handleAuthError(error, request);
    }
  };

  const handleAuthError = (error: any, request: RawRequest) => {
    // If this is not an axios error something else blocked the request.
    if (!(error instanceof AxiosError)) {
      return request.onError(serverError);
    }
    // There there is no response then this is a server error
    if (!error.response) {
      return request.onError(serverError);
    }
    // Grab the response
    const json = error.response.data;
    return request.onError(json);
  };

  return {
    login,
    signup,
    verifyAuth,
  };
});
