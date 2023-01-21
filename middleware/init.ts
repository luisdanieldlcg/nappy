export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path === "/") {
    return navigateTo("/login");
  }
  return navigateTo(to.path);
});
