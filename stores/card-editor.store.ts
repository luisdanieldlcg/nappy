import { CropperResult } from "vue-advanced-cropper";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

export function createCardEditorStore(dto: ICardDTO) {
  return defineStore("card-editor", () => {
    const card = ref<ICardDTO>(dto);
    const form = new FormData();

    const profilePicImage = ref<string | undefined>();
    const editorResult = ref<CropperResult | undefined>();
    const canvas = ref<HTMLCanvasElement | undefined>();

    const submit = async () => {
      Object.entries(card.value).forEach(([key, value]) => {
        form.append(key, value);
      });
      const cardManager = useCardStore();
      await cardManager.create(form);
    };
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
      card,
      submit,
    };
  })();
}
