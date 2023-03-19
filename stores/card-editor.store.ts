import { CropperResult } from "vue-advanced-cropper";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

const DEFAULT_COVER_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/006/304/595/small/white-and-silver-color-background-with-dynamic-diagonal-stripe-lines-and-halftone-texture-modern-and-simple-gray-color-template-banner-design-luxury-and-elegant-concept-eps10-vector.jpg";

export const useCardEditorStore = defineStore("cardEditor", () => {
  // Card Editor image state
  const selectedImageToEdit = ref("");
  const canvas = ref<HTMLCanvasElement | undefined>();
  const showFileDropDialog = ref(false);
  const defaultCard: ICardDTO = {
    id: "",
    firstName: "Luis",
    lastName: "de la Cruz",
    company: "",
    coverImage: "",
    jobTitle: "",
    label: "Work",
    color: Colors.greyLight,
  };
  const cardState = reactive<ICardDTO>({
    ...defaultCard,
  });
  const isEditingImage = computed(() => selectedImageToEdit.value !== "");
  const imageCropPreview = ref<CropperResult | undefined>();

  const $reset = () => {
    selectedImageToEdit.value = "";
    Object.assign(cardState, defaultCard);
  };

  const openImageEditor = (image: string) => {
    selectedImageToEdit.value = image;
  };

  const removeCoverImage = () => {
    cardState.coverImage = DEFAULT_COVER_IMAGE;
  };

  const exitImageEditor = () => {
    selectedImageToEdit.value = "";
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
  const updateResult = (result: CropperResult) => {
    imageCropPreview.value = result;
    canvas.value = result.canvas;
  };

  return {
    cardState,
    showFileDropDialog,
    selectedImageToEdit,
    isEditingImage,
    imageCropPreview,
    updateResult,
    canvas,
    submit,
    $reset,
    exitImageEditor,
    removeCoverImage,
    openImageEditor,
    closeImagePickDialog,
  };
});
