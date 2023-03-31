import { CropperResult } from "vue-advanced-cropper";
import { ImageType } from "./card-editor.store";

export const useImageEditor = defineStore("imageEditor", () => {
  // The image being edited
  const image = ref("");
  // A realtime preview of the image.
  const preview = ref<CropperResult | undefined>();
  // The image slot where the image to edit belongs.
  const imageSlot = ref<ImageType | undefined>();

  const update = (update: CropperResult) => {
    preview.value = update;
  };
  const onOpen = (imageToEdit: string) => {
    image.value = imageToEdit;
    useCardEditorStore().isEditingImage = true;
  };
  const $reset = () => {
    image.value = "";
    preview.value = undefined;
  };

  return {
    image,
    preview,
    imageSlot,
    update,
    $reset,
    onOpen,
  };
});
