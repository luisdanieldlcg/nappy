import ViewState from "~/state/view";
import { RawResponse } from "~/api/interfaces";
import { useAuthStore } from "./auth_store";
export const useSignupStore = defineStore("signup", () => {
  const form = reactive({
    email: "",
    password: "",
    passwordConfirm: "",
    checkbox: false,
  });
  const viewState = reactive(new ViewState());
  const signup = async (onReady: () => void) => {
    viewState.setLoading(true);
    const authController = useAuthStore();
    await authController.signup({
      email: form.email,
      password: form.password,
      passwordConfirm: form.passwordConfirm,
      onError: displayError,
      onSuccess: (response) => {
        setIdle();
        onReady();
      },
    });
    viewState.setLoading(false);
  };
  const displayError = (error: RawResponse) => {
    viewState.showAlert = true;
    viewState.setErrorMsg(error.message);
  };

  const setIdle = () => {
    viewState.showAlert = false;
    form.checkbox = false;
    form.email = "";
    form.password = "";
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
