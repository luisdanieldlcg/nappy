import { AxiosResponse, isAxiosError } from "axios";
import { Result } from "true-myth";
import * as api from "~/api/index";
import { LoginDTO, LoginResponse } from "~~/api/dtos/login_dto";
import { SignupDTO, SignupResponse } from "~~/api/dtos/signup_dto";
import { ErrorResponse } from "~~/api/endpoints";

export const useAuthStore = defineStore("auth", () => {
  const logIn = async (dto: LoginDTO) => {
    return exec<AxiosResponse<LoginResponse>>(() => api.login(dto));
  };

  const signUp = async (dto: SignupDTO) => {
    return exec<AxiosResponse<SignupResponse>>(() => api.signup(dto));
  };

  const verifyToken = async () => {
    return exec<AxiosResponse>(() => api.verify());
  };

  const exec = async <T extends AxiosResponse>(
    executor: () => Promise<T>
  ): Promise<Result<AxiosResponse<T>, string>> => {
    try {
      const result = await executor();
      return Result.ok(result);
    } catch (error) {
      if (
        !isAxiosError<ErrorResponse>(error) ||
        !error.response ||
        !error.response.data
      ) {
        return Result.err("Failed to connect to nappy servers.");
      }
      return Result.err(error.response.data.message);
    }
  };
  return {
    logIn,
    signUp,
    verifyToken,
  };
});
