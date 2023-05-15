import { ISignupDTO } from "~/api/dtos/signup.dto";
import { FieldType } from "~/pages/onboarding/index.vue";
import { Card } from "./card-editor.store";

interface LinkModalReq {
  field: FieldType;
  show: boolean;
  isEditing: boolean;
  index: number;
}
export const useOnboardingStore = defineStore("onboarding", () => {
  const step = ref(0);
  const errorMessage = ref("");
  const showAlert = ref(false);
  const loading = ref(false);
  const editingImage = ref(false);
  const linkModalRequest = ref<LinkModalReq>({
    field: "name",
    show: false,
    isEditing: false,
    index: -1,
  });

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

  // Watch for changes in the card links and update the cardBeforeEdit
  // this is so it updates the cardBeforeEdit when the user drags and drops a link
  watch(
    () => card.links,
    (_) => {
      Object.assign(cardBeforeEdit, card);
    }
  );
  const cardBeforeEdit = reactive<Card>({
    label: "Work",
    firstName: "Daniel",
    lastName: "dlc",
    jobTitle: "",
    company: "",
    color: Colors.greyLight,
    avatarImage: "",
    coverImage: "",
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

  const updateLinkModalReq = (opts: {
    field: FieldType;
    isEditing: boolean;
    index: number;
  }) => {
    linkModalRequest.value.field = opts.field;
    linkModalRequest.value.show = true;
    linkModalRequest.value.isEditing = opts.isEditing;
    linkModalRequest.value.index = opts.index;
  };
  return {
    accountForm,
    step,
    showAlert,
    errorMessage,
    loading,
    cardBeforeEdit,
    card,
    linkModalRequest,
    editingImage,
    createAccount,
    processForm,
    updateLinkModalReq,
  };
});
