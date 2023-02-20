import { AxiosResponse, isAxiosError } from "axios";
import { Result } from "true-myth";
import * as api from "~/api/index";
import { LoginDTO, LoginResponse } from "~~/api/dtos/login_dto";
import { SignupDTO, SignupResponse } from "~~/api/dtos/signup_dto";
import { makeRequest } from "~~/utils/request";

export const useAuthStore = defineStore("auth", () => {
  const logIn = async (dto: LoginDTO) => {
    return makeRequest<LoginResponse>(() => api.login(dto));
  };

  const signUp = async (dto: SignupDTO) => {
    return makeRequest<SignupResponse>(() => api.signup(dto));
  };

  const verifyToken = async () => {
    return makeRequest<void>(() => api.verify());
  };

  return {
    logIn,
    signUp,
    verifyToken,
  };
});
