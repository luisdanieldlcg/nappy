import axios from "axios";
import { AuthModule } from "~~/api/modules/auth.module";
import { CardModule } from "~~/api/modules/card.module";
import { API_BASE_URL } from "~~/config/url";

interface IApiInstance {
  auth: AuthModule;
  card: CardModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const httpInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
  });
  const modules: IApiInstance = {
    auth: new AuthModule(httpInstance),
    card: new CardModule(httpInstance),
  };

  return {
    provide: {
      api: modules,
    },
  };
});
