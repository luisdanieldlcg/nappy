export enum AuthEndpoint {
  LOG_IN = "/login",
  SIGN_UP = "/signup",
  VERIFY_TOKEN = "/verify",
}
export function useAuthAPI<T>(endpoint: AuthEndpoint) {
  return useAPI<T>({
    resource: Resource.AUTH,
    method: HttpMethod.POST,
    endpoint: endpoint,
    lazy: true,
  });
}
