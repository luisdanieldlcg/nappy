import { CropperResult } from "vue-advanced-cropper";
import { ICardDTO } from "~~/api/dtos/card.dto";

export const useCardEditorStore = defineStore("card-editor", () => {
  const card = ref<ICardDTO>();
  const profilePicImage = ref<string | undefined>();
  const editorResult = ref<CropperResult | undefined>();
  const canvas = ref<HTMLCanvasElement | undefined>();

  const updateResult = (result: CropperResult) => {
    editorResult.value = result;
    canvas.value = result.canvas;
  };

  const init = (dto: ICardDTO) => {
    card.value = dto;
  };
  return {
    profilePicImage,
    editorResult,
    updateResult,
    canvas,
    init,
  };
});
