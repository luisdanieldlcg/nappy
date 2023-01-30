import ViewState from "~/state/view";
import { SignupDTO } from "~~/api/dtos/signup_dto";
import { useAuthStore } from "./auth_store";
export const useSignupStore = defineStore("signup", () => {
  // State objects
  const email = ref("");
  const password = ref("");
  const passwordConfirm = ref("");
  const checkbox = ref(false);
  const viewState = reactive(new ViewState());
  const snackbar = ref(false);
  async function signUp() {
    const dto: SignupDTO = {
      email: email.value,
      password: password.value,
      passwordConfirm: passwordConfirm.value,
    };
    const authController = useAuthStore();
    viewState.setLoading(true);
    const result = await authController.signUp(dto);
    result.match({
      Ok(response) {
        snackbar.value = true;
        navigateTo("/login");
      },
      Err(error) {
        viewState.setErrorMsg(error.message);
        viewState.showAlert = true;
      },
    });
    viewState.setLoading(false);
  }

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
    (text: string) => text === password.value || "Passwords do not match.",
  ];
  return {
    viewState,
    email,
    password,
    passwordConfirm,
    checkbox,
    signUp,
    checkboxRules,
    emailRules,
    passwordRules,
    passwordConfirmRules,
    snackbar,
  };
});
