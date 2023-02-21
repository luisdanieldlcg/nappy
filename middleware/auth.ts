export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.startsWith("/app")) {
    const { execute, response } = useAuthAPI(AuthEndpoint.VERIFY_TOKEN);
    await execute();
    if (!response.value?.data) {
      return navigateTo("/login");
    }
  }
});
