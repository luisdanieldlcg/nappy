import { CropperResult } from "vue-advanced-cropper";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

export const useCardEditorStore = defineStore("card-editor", () => {
  const profilePicImage = ref<string | undefined>();
  const editorResult = ref<CropperResult | undefined>();
  const canvas = ref<HTMLCanvasElement | undefined>();

  const submit = async (card: ICardDTO) => {
    const form = new FormData();
    Object.entries(card).forEach(([key, value]) => {
      form.append(key, value);
    });
    console.log(form);
    const cardManager = useCardStore();
    await cardManager.create(form);
  };
  const updateResult = (result: CropperResult) => {
    editorResult.value = result;
    canvas.value = result.canvas;
  };
  

  return {
    profilePicImage,
    editorResult,
    updateResult,
    canvas,
    submit,
  }
});