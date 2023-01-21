export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/") {
    return navigateTo("/login");
  }
  if (to.path.includes("/app")) {
    return navigateTo("/app/overview");
  }
  return navigateTo(to.path);
});
