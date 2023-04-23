import { ISignupDTO } from "~/api/dtos/signup.dto";

export const useOnboardingStore = defineStore("onboarding", () => {
  const step = ref(0);
  const errorMessage = ref("");
  const showAlert = ref(false);
  const loading = ref(false);
  const accountForm = reactive({
    email: "",
    password: "",
    passwordConfirm: "",
    agreeToTerms: false,
  });

  const createAccount = async () => {
    const dto: ISignupDTO = {
      email: accountForm.email,
      password: accountForm.password,
      passwordConfirm: accountForm.passwordConfirm,
    };
    const { $api } = useNuxtApp();
    const result = await $api.auth.signup(dto);
    return result;
  };

  const processForm = async (): Promise<boolean> => {
    switch (step.value) {
      case 0:
        return tryLogin();
    }
    return true;
  };
  const tryLogin = async () => {
    loading.value = true;
    const result = await createAccount();
    loading.value = false;
    if (result.isErr) {
      errorMessage.value = result.error;
      showAlert.value = true;
      return false;
    }
    showAlert.value = false;
    errorMessage.value = "";
    return true;
  };
  return {
    accountForm,
    step,
    showAlert,
    errorMessage,
    loading,
    createAccount,
    processForm,
  };
});
