import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

export enum ImageType {
  Cover,
  Avatar,
}
// Same as CardDTO but with custom fields
// for the card editor.
export type Card = {
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
  const cardState = reactive<Card>({
    ...defaultCard,
  });

  // Whether the user is editing an image.
  const isEditingImage = ref(false);
  // The image to edit. This is the image that is being edited via cropper.
  const imageToEdit = ref("");
  // The image slot where the image to edit belongs.
  const imageSlot = ref<ImageType | undefined>();

  const selectImageSlot = (type: ImageType) => {
    imageSlot.value = type;
  };
  const showFileDropDialog = ref(false);

  const enterImageEditMode = (file: string) => {
    isEditingImage.value = true;
    switch (imageSlot.value) {
      case ImageType.Cover:
        imageToEdit.value = file;
        isEditingImage.value = true;
        break;
      case ImageType.Avatar:
        imageToEdit.value = file;
        isEditingImage.value = true;
        break;
      default:
        // handle undefined case
        break;
      // TODO: add logo
    }
  };

  const $reset = () => {
    Object.assign(cardState, defaultCard);
    isEditingImage.value = false;
    imageSlot.value = undefined;
    useImageEditor().$reset();
  };

  const removeCoverImage = () => {
    cardState.coverImage = null;
  };

  const closeImagePickDialog = () => {
    showFileDropDialog.value = false;
  };

  const submit = async () => {
    const form = new FormData();
    Object.entries(cardState).forEach(([key, value]) => {
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
        blob = cardState.coverImage;
        break;
      case ImageType.Avatar:
        blob = cardState.avatarImage;
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
    cardState,
    showFileDropDialog,
    isEditingImage,
    imageToEdit,
    imageSlot,
    submit,
    $reset,
    removeCoverImage,
    closeImagePickDialog,
    enterImageEditMode,
    selectImageSlot,
    getSourceForImage,
  };
});
