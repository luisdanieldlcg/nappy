import { useCardStore } from "./card.store";

export enum ImageType {
  Cover,
  Avatar,
}

type Card = {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  label: string;
  coverImage: Blob | null;
  avatarImage: Blob | null;
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

  const submit = async () => {
    const form = new FormData();
    Object.entries(card).forEach(([key, value]) => {
      if (value) {
        form.append(key, value);
      }
    });
    const cardManager = useCardStore();
    await cardManager.create(form);
  };

  const getSourceForImage = (type: ImageType) => {
    let blob = null;
    switch (type) {
      case ImageType.Cover:
        blob = card.coverImage;
        break;
      case ImageType.Avatar:
        blob = card.avatarImage;
        break;
    }
    if (blob != null) {
      const src = URL.createObjectURL(blob);
      setTimeout(() => {
        URL.revokeObjectURL(src);
      }, 1000);
      return src;
    }
    return undefined;
  };

  return {
    card,
    isEditingImage,
    imageDropDialog,
    coverImagePreview,
    avatarImagePreview,
    submit,
    $reset,
    removeCoverImage,
    getSourceForImage,
  };
});
