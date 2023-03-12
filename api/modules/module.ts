import {
  AxiosInstance,
  AxiosResponse,
  isAxiosError,
  RawAxiosRequestConfig,
} from "axios";
import { Result } from "true-myth";
import { ErrorResponse } from "~~/utils/response-utils";

interface RequestOptions {
  endpoint: string;
  data: object;
  opts?: RawAxiosRequestConfig;
}
type ApiResponse<T> = Promise<Result<T, string>>;

export abstract class ApiModule {
  constructor(protected readonly http: AxiosInstance) {
    // http.interceptors.response.use((cfg) => cfg, ApiModule.resErrorInterceptor);
  }

  protected abstract getResource(): string;

  protected async get<T>(endpoint: string) {
    return ApiModule.tryCatchResult(
      this.http.get<T>(this.getResource() + endpoint)
    );
  }

  protected async post<T>(opts: RequestOptions): ApiResponse<T> {
    const result = this.http.post<T>(
      this.getResource() + opts.endpoint,
      opts.data,
      opts.opts
    );
    return ApiModule.tryCatchResult<T>(result);
  }

  protected async put<T>() {}

  protected async delete<T>(id: string) {
    const targetRoute = this.getResource() + `/${id}`;
    return ApiModule.tryCatchResult(this.http.delete<T>(targetRoute));
  }

  private static tryCatchResult = async <T>(
    future: Promise<AxiosResponse<T>>
  ): Promise<Result<T, string>> => {
    try {
      const res = await future;
      return Result.ok(res.data);
    } catch (error) {
      const message = this.resErrorInterceptor(error);
      return Result.err(message);
    }
  };

  private static resErrorInterceptor = (error: any) => {
    if (
      !isAxiosError<ErrorResponse>(error) ||
      !error.response ||
      !error.response.data
    ) {
      return "Failed to connect to nappy servers.";
    }
    const message = error.response.data.message;
    const badState =
      "Something went very wrong. Try again or contact with support";
    if (Array.isArray(message)) {
      return message.length === 0 ? badState : message[0];
    }
    return message;
  };
}
