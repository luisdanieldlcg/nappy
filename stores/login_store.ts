import ViewState from "~/state/view";
import * as AuthAPI from "~/api/AuthAPI";
import { AppResponse, AuthResponse } from "~/api/interfaces/auth_interface";
export const useLoginStore = defineStore("login", () => {
  const form = reactive({
    email: "",
    password: "",
  });
  const viewState = reactive(new ViewState());
  const logIn = async (onReady: () => void) => {
    viewState.setLoading(true);
    await AuthAPI.login({
      email: form.email,
      password: form.password,
      onError: displayError,
      onSuccess: (response) => {
        setIdle();
        onReady();
      },
    });
    viewState.setLoading(false);
  };
  const displayError = (error: AppResponse) => {
    viewState.showAlert = true;
    viewState.setErrorMsg(error.message);
  };
  const setIdle = () => {
    viewState.showAlert = false;
    form.email = "";
    form.password = "";
  };
  const emailRules = [
    (text: string) => !!text || "Email is required",
    (text: string) => /.+@.+/.test(text) || "This is not a valid email",
  ];
  const passwordRules = [
    (text: string) => !!text || "Password is required",
    (text: string) => text.length >= 8 || "This is not a valid password",
  ];
  return {
    viewState,
    form,
    logIn,
    emailRules,
    passwordRules,
  };
});
