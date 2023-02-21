import { useAxios } from "@vueuse/integrations/useAxios";
import { HttpMethod } from "~~/utils/http-method";
import { AuthEndpoint } from "~/composables/useAuthAPI";

type Options = {
  resource: Resource;
  method: HttpMethod;
  endpoint: AuthEndpoint | "/";
  lazy: boolean;
};

export enum Resource {
  AUTH = "auth",
  CARDS = "cards",
}

export const API_URL = "http://localhost:3001/api/v1/";

export function useAPI<T>(options: Options) {
  const errorMessage = ref("");
  const showAlert = ref(false);
  const { isLoading, data, execute, response } = useAxios<T>(
    API_URL + options.resource + options.endpoint,
    {
      method: options.method,
      withCredentials: true,
    },
    {
      immediate: !options.lazy,
      onSuccess(e) {
        showAlert.value = false;
      },
      onError: (e) => {
        errorMessage.value = parseErrorMessage(e);
        showAlert.value = true;
      },
    }
  );
  return {
    isLoading,
    data,
    errorMessage,
    showAlert,
    execute,
    response,
  };
}
