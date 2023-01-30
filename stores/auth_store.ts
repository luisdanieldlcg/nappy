import { AxiosError, isAxiosError } from "axios";
import { RawRequest, serverError } from "~/api/interfaces";
import { LoginDTO, LoginResponse } from "~~/api/dtos/login_dto";
import * as api from "~/api/index";
import { Result } from "true-myth";
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

  function handleHttpError(error: any): Result<LoginResponse, ErrorResponse> {
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

  // const verifyAuth = async (request: RawRequest) => {
  //   try {
  //     const response = await AuthAPI.get<RawResponse>("/verifyIdToken");
  //     const json = response.data;
  //     return request.onSuccess(json);
  //   } catch (error) {
  //     return handleAuthError(error, request);
  //   }
  // };
  // const signOut = async (request: RawRequest) => {
  //   try {
  //     const response = await AuthAPI.get<RawResponse>("/sign-out");
  //     const json = response.data;
  //     return request.onSuccess(json);
  //   } catch (error) {
  //     return handleAuthError(error, request);
  //   }
  // };

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
    signIn,
    signUp,
    // verifyAuth,
    // signOut,
  };
});
