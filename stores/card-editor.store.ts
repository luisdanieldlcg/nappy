import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

export enum ImageType {
  Cover,
  Avatar,
}

export const useCardEditorStore = defineStore("cardEditor", () => {
  const defaultCard: ICardDTO = {
    id: "",
    firstName: "Luis",
    lastName: "de la Cruz",
    company: "",
    coverImage: "",
    jobTitle: "",
    label: "Work",
    avatarImage: "",
    color: Colors.greyLight,
  };
  const cardState = reactive<ICardDTO>({
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
    cardState.coverImage = "";
  };

  const closeImagePickDialog = () => {
    showFileDropDialog.value = false;
  };

  const submit = async (card: ICardDTO) => {
    const form = new FormData();
    Object.entries(cardState).forEach(([key, value]) => {
      form.append(key, value);
    });
    const cardManager = useCardStore();
    await cardManager.create(form);
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
  };
});
