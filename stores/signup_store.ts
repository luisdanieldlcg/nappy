import ViewState from "~/state/view";
import * as AuthAPI from "~/api/AuthAPI";
import { AppResponse, AuthResponse } from "~/api/interfaces/auth_interface";
export const useSignupStore = defineStore("signup", () => {
  const form = reactive({
    email: "",
    password: "",
    checkbox: false,
  });
  const viewState = reactive(new ViewState());
  const signup = async () => {
    viewState.setLoading(true);
    await AuthAPI.signup({
      email: form.email,
      password: form.password,
      onError: displayError,
      onSuccess: redirect,
    });
    viewState.setLoading(false);
  };
  const displayError = (error: AppResponse) => {
    viewState.showAlert = true;
    viewState.setErrorMsg(error.message);
  };
  const redirect = (response: AuthResponse) => {
    viewState.showAlert = false;
    console.log(JSON.stringify(response));
  };

  const checkboxRules = [
    (check: Boolean) =>
      !!check ||
      "You must agree the Terms of Service if you want to create an account.",
  ];
  const emailRules = [
    (text: string) => !!text || "Email is required",
    (text: string) => /.+@.+/.test(text) || "Email must be valid",
  ];
  const passwordRules = [
    (text: string) => !!text || "Password is required",
    (text: string) =>
      text.length >= 8 || "Your password must be at least 8 characters long.",
  ];

  const passwordConfirmRules = [
    (text: string) => !!text || "Password Confirm is required",
    (text: string) => text === form.password || "Passwords do not match.",
  ];
  return {
    viewState,
    form,
    signup,
    checkboxRules,
    emailRules,
    passwordRules,
    passwordConfirmRules,
  };
});
