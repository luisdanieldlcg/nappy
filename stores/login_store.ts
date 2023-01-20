import ViewState from "~/state/view";
import * as AuthAPI from "~/api/AuthAPI";
import { AppResponse, AuthResponse } from "~/api/interfaces/auth_interface";
export const useLoginStore = defineStore("login", () => {
  const form = reactive({
    email: "",
    password: "",
  });
  const viewState = reactive(new ViewState());
  const logIn = async () => {
    viewState.setLoading(true);
    await AuthAPI.login({
      email: form.email,
      password: form.password,
      onError: displayError,
      onSuccess: redirect,
    });
    viewState.setLoading(false);
  };
  const displayError = (error: AppResponse) => {
    viewState.setErrorMsg(error.message);
    console.log(JSON.stringify(error));
  };
  const redirect = (response: AuthResponse) => {
    console.log(JSON.stringify(response));
  };
  return {
    viewState,
    form,
    logIn,
  };
});
