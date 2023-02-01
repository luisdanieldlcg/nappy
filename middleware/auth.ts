import { useAuthStore } from "~~/stores/auth_store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith("/app")) {
    const controller = useAuthStore();
    const result = await controller.verifyToken();
    if (result.isErr) {
      return navigateTo("/login");
    }
  }
});
