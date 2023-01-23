import ViewState from "~/state/view";
import { RawResponse } from "~/api/interfaces";
import { useAuthStore } from "./auth_store";

export const useLoginStore = defineStore("login", () => {
  const form = reactive({
    email: "",
    password: "",
  });
  const viewState = reactive(new ViewState());
  const authController = useAuthStore();

  const logIn = async (onReady: () => void) => {
    viewState.setLoading(true);
    await authController.login({
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
  const displayError = (error: RawResponse) => {
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
