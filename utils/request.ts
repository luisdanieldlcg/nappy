import { AxiosResponse, isAxiosError } from "axios";
import { Result } from "true-myth";
import { ErrorResponse } from "~~/api/endpoints";

export const makeRequest = async <T>(
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
    return Result.err(error.response.data.message);
  }
};
