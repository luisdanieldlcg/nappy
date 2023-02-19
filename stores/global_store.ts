import { Result } from "true-myth";
import { ErrorResponse } from "~~/api/endpoints";

type FutureResult<T> = Promise<Result<T, ErrorResponse>>;

export const useAuthStore = defineStore("global", () => {
  return {
   
  };
});
