import { useCardStore } from "./card.store";

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
      if (value) {
        form.append(key, value);
      }
    });
    return form;
  };

  const setCard = (newCard: Card) => {
    Object.assign(card, newCard);
    const cover = newCard.coverImage;
    const avatar = newCard.avatarImage;
    if (!cover) {
      coverImagePreview.value = "";
    } else {
      coverImagePreview.value = "http://localhost:3001/images/" + cover;
    }

    if (!avatar) {
      avatarImagePreview.value = "";
    } else {
      avatarImagePreview.value = "http://localhost:3001/images/" + avatar;
    }
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
