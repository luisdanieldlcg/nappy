import { CropperResult } from "vue-advanced-cropper";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

export const useCardEditorStore = defineStore("card-editor", () => {
  const profilePicImage = ref<string | undefined>();
  const backgroundResult = ref<CropperResult | undefined>();
  const canvas = ref<HTMLCanvasElement | undefined>();
  const editingImage = ref(false);

  const submit = async (card: ICardDTO) => {
    const form = new FormData();
    Object.entries(card).forEach(([key, value]) => {
      form.append(key, value);
    });
    const cardManager = useCardStore();
    await cardManager.create(form);
  };
  const updateResult = (result: CropperResult) => {
    backgroundResult.value = result;
    canvas.value = result.canvas;
    console.log("Got result: ", result.image);
  };

  return {
    profilePicImage,
    backgroundResult,
    updateResult,
    canvas,
    submit,
    editingImage,
  };
});
