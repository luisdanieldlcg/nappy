export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith("/app")) {
    const { $api } = useNuxtApp();
    const result = await $api.auth.verify();
    if (result.isErr) {
      return navigateTo("/login");
    }
  }
});
