import { CropperResult } from "vue-advanced-cropper";

export const useImageEditor = defineStore("imageEditor", () => {
  // The image being edited
  const image = ref("");
  // The original image that was sent when the ImageEditor was opened.
  // This is used to reset the image to its original state, for example
  // when the user cancels the editing.
  const originalImage = ref("");
  // The HTML canvas element that will be used to render the image
  const canvas = ref<HTMLCanvasElement | undefined>();
  // A realtime preview of the image.
  const preview = ref<CropperResult | undefined>();

  const resetImage = () => {
    image.value = originalImage.value;
  };
  const setOriginalImage = () => {
    const editor = useCardEditorStore();
    switch (editor.imageSlot) {
      case ImageType.Cover:
        // originalImage.value = editor.card.coverImage;
        break;
      case ImageType.Avatar:
       // originalImage.value = editor.card.avatarImage;
        break;
    }
  };

  const update = (update: CropperResult) => {
    preview.value = update;
  };

  const $reset = () => {
    image.value = "";
    canvas.value = undefined;
    preview.value = undefined;
    originalImage.value = "";
  };

  return {
    image,
    originalImage,
    canvas,
    preview,
    update,
    $reset,
    setOriginalImage,
    resetImage,
  };
});
