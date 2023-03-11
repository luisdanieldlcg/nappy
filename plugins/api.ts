import axios from "axios";
import { AuthModule } from "~~/api/modules/auth.module";
import { API_BASE_URL } from "~~/config/url";

interface IApiInstance {
  auth: AuthModule;
}

export default defineNuxtPlugin((nuxtApp) => {
  const httpInstance = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    
  });
  const modules: IApiInstance = {
    auth: new AuthModule(httpInstance),
  };
  return {
    provide: {
      api: modules,
    },
  };
});
