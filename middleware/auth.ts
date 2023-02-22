import { verify } from "~~/api";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith("/app")) {
    const result = await verify();
    if (!result.data) {
      return navigateTo("/login");
    }
  }
});
