import { AxiosError, isAxiosError } from "axios";
import { LoginDTO, LoginResponse } from "~~/api/dtos/login_dto";
import * as api from "~/api/index";
import { Result, Unit } from "true-myth";
import { ErrorResponse } from "~~/api/endpoints";
import { SignupDTO, SignupResponse } from "~~/api/dtos/signup_dto";

type FutureResult<T> = Promise<Result<T, ErrorResponse>>;

export const useAuthStore = defineStore("auth", () => {
  async function signIn(input: LoginDTO): FutureResult<LoginResponse> {
    try {
      const response = await api.login(input);
      return Result.ok(response.data);
    } catch (error) {
      return handleHttpError(error);
    }
  }

  async function signUp(input: SignupDTO): FutureResult<SignupResponse> {
    try {
      const response = await api.signup(input);
      return Result.ok(response.data);
    } catch (error) {
      return handleHttpError(error);
    }
  }
  async function logOut(): FutureResult<Unit> {
    try {
      await api.logout();
      return Result.ok();
    } catch (error) {
      return handleHttpError(error);
    }
  }

  function handleHttpError(error: any): Result<any, ErrorResponse> {
    if (
      !isAxiosError<ErrorResponse>(error) ||
      !error.response ||
      !error.response.data
    ) {
      return Result.err({
        message: "Could not reach Nappy Servers.",
        statusCode: 500,
      });
    } else {
      const json = error.response.data;
      return Result.err(json);
    }
  }

  return {
    signIn,
    signUp,
    logOut,
    // verifyAuth,
    // signOut,
  };
});
