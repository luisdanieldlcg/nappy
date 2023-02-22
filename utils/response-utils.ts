import { AxiosResponse, isAxiosError } from "axios";
import { Result, Maybe } from "true-myth";

export class ErrorResponse {
  message: string | string[];
  statusCode: number;
}

export const handleRequest = async <T>(
  executor: () => Promise<AxiosResponse<T>>
): Promise<Result<T, string>> => {
  try {
    const result = await executor();
    return Result.ok(result.data);
  } catch (error) {
    if (
      !isAxiosError<ErrorResponse>(error) ||
      !error.response ||
      !error.response.data
    ) {
      return Result.err("Failed to connect to nappy servers.");
    }
    const message = error.response.data.message;
    const badState =
      "Something went very wrong. Try again or contact with support";
    if (Array.isArray(message)) {
      return Result.err(message.length === 0 ? badState : message[0]);
    }
    return Result.err(message);
  }
};
