export enum ImageType {
  Cover,
  Avatar,
}

export type Card = {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  label: string;
  coverImage: Blob | string | null;
  avatarImage: Blob | string | null;
  color: string;
};

export const useCardEditorStore = defineStore("cardEditor", () => {
  const defaultCard: Card = {
    firstName: "Luis",
    lastName: "de la Cruz",
    company: "",
    jobTitle: "",
    label: "Work",
    coverImage: null,
    avatarImage: null,
    color: Colors.greyLight,
  };
  const coverImagePreview = ref("");
  const avatarImagePreview = ref("");

  const card = reactive<Card>({
    ...defaultCard,
  });

  // Whether the user is editing an image.
  const isEditingImage = ref(false);
  const imageDropDialog = ref(false);

  const $reset = () => {
    Object.assign(card, defaultCard);
    isEditingImage.value = false;
    useImageEditor().$reset();
    coverImagePreview.value = "";
    avatarImagePreview.value = "";
  };

  const removeCoverImage = () => {
    card.coverImage = null;
  };

  const createForm = () => {
    const form = new FormData();
    Object.entries(card).forEach(([key, value]) => {
      form.append(key, value ? value : "");
    });
    return form;
  };

  const setCard = (newCard: Card) => {
    Object.assign(card, newCard);
    coverImagePreview.value = card.coverImage as string;
    avatarImagePreview.value = card.avatarImage as string;
  };

  return {
    card,
    isEditingImage,
    imageDropDialog,
    coverImagePreview,
    avatarImagePreview,
    createForm,
    $reset,
    removeCoverImage,
    setCard,
  };
});
