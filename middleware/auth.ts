import { useAuthStore } from "~~/stores/auth_store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith("/app")) {
    const auth = useAuthStore();
    return await auth.verifyAuth({
      onError(error) {
        return navigateTo("/login");
      },
      onSuccess(response) {},
    });
  }
});
