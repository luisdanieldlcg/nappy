import { ISignupDTO } from "~/api/dtos/signup.dto";
import { FieldType } from "~/pages/onboarding/index.vue";
import { Card } from "./card-editor.store";

export const useOnboardingStore = defineStore("onboarding", () => {
  const step = ref(0);
  const errorMessage = ref("");
  const showAlert = ref(false);
  const loading = ref(false);
  const selectedCardField = ref<FieldType>("name");
  const showCardFieldModal = ref(false);

  const card = reactive<Card>({
    firstName: "",
    lastName: "",
    company: "",
    jobTitle: "",
    label: "Personal",
    color: Colors.black,
    avatarImage: "",
    coverImage: "",
    links: [],
    useNativeIcons: false,
  });

  const cardBeforeEdit = reactive<Card>({
    label: "Work",
    firstName: "Daniel",
    lastName: "dlc",
    jobTitle: "",
    company: "",
    color: Colors.greyLight,
    avatarImage: null,
    coverImage: null,
    links: [],
    useNativeIcons: false,
  });
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
    selectedCardField,
    showCardFieldModal,
    cardBeforeEdit,
    createAccount,
    processForm,
    card,
  };
});
