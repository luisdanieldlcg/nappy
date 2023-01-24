import { useAuthStore } from "~~/stores/auth_store";

export default defineNuxtRouteMiddleware(async (to, from) => {
  if (to.path.includes("/app")) {
    console.log("This is a private route");
    const auth = useAuthStore();
    return await auth.verifyAuth({
      onError(error) {
        console.log("Error");
        console.log(error.message);
        return "/login";
      },
      onSuccess(response) {
        console.log("Success");
        console.log(response.message);
        return "app/cards";
      },
    });
  }
});

