import { CropperResult } from "vue-advanced-cropper";

export const useCardEditorStore = defineStore("card-editor", () => {
  const profilePicImage = ref<string | undefined>();
  const editorResult = ref<CropperResult | undefined>();
  const canvas = ref<HTMLCanvasElement | undefined>();

  const updateResult = (result: CropperResult) => {
    editorResult.value = result;
    canvas.value = result.canvas;
  };
  return {
    profilePicImage,
    editorResult,
    updateResult,
    canvas,
  };
});
