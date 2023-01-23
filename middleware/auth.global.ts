import { callWithNuxt } from "nuxt/dist/app/nuxt";
import { verifyAuth } from "~/api/AuthAPI";

export default defineNuxtRouteMiddleware(async (to, from) => {
  // const nuxtApp = useNuxtApp();
  // if (to.path.includes("/app")) {
  //   return await verifyAuth({
  //     onError(error) {
  //       console.log(error.message);
  //       callWithNuxt(nuxtApp, navigateTo, ["/login"]);
  //     },
  //     onSuccess(response) {
  //       console.log(response.message);
  //       callWithNuxt(nuxtApp, navigateTo, ["/app/overview"]);
  //     },
  //   });
  // }
});
