import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

export enum SelectedImageType {
  None,
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

  const selectImage = (file: string) => {
    selectedImageSlot.value[1] = file;
    switch (selectedImageSlot.value[0]) {
      case SelectedImageType.Cover:
        cardState.coverImage = file;
        break;
      case SelectedImageType.Avatar:
        cardState.avatarImage = file;
        break;
      // TODO: add logo
    }
  };

  const showFileDropDialog = ref(false);
  // Represents the image slot to edit, and which image was selected.
  const selectedImageSlot = ref<[SelectedImageType, string]>([
    SelectedImageType.None,
    "",
  ]);

  const $reset = () => {
    Object.assign(cardState, defaultCard);
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
  // const updateResult = (result: CropperResult) => {
  //   imageCropPreview.value = result;
  //   canvas.value = result.canvas;
  // };

  const selectedImage = computed(() => selectedImageSlot.value[1]);

  return {
    cardState,
    showFileDropDialog,
    selectedImageSlot,
    submit,
    $reset,
    removeCoverImage,
    closeImagePickDialog,
    selectedImage,
    selectImage,
  };
});
