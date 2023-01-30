import ViewState from "~/state/view";
import { useAuthStore } from "./auth_store";
import { LoginDTO } from "~~/api/dtos/login_dto";

export const useLoginStore = defineStore("login", () => {
  const email = ref("");
  const password = ref("");
  const viewState = reactive(new ViewState());
  const auth = useAuthStore();

  async function signIn() {
    const dto: LoginDTO = {
      email: email.value,
      password: password.value,
    };
    viewState.setLoading(true);
    const result = await auth.signIn(dto);
    result.match({
      Ok(response) {
        navigateTo("/app");
      },
      Err(error) {
        viewState.setErrorMsg(error.message);
        viewState.showAlert = true;
      },
    });
    viewState.setLoading(false);
  }

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
    email,
    password,
    signIn,
    emailRules,
    passwordRules,
  };
});
