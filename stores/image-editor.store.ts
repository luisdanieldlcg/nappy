import { CropperResult } from "vue-advanced-cropper";

export const useImageEditor = defineStore("imageEditor", () => {
  // The image being edited
  const image = ref("");
  // The HTML canvas element that will be used to render the image
  const canvas = ref<HTMLCanvasElement | undefined>();
  // A realtime preview of the image.
  const preview = ref<CropperResult | undefined>();

  const update = (update: CropperResult) => {
    preview.value = update;
  };

  return {
    image,
    canvas,
    preview,
    update,
  };
});
