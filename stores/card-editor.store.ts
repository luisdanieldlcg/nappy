import { CropperResult } from "vue-advanced-cropper";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

const DEFAULT_COVER_IMAGE =
  "https://static.vecteezy.com/system/resources/thumbnails/006/304/595/small/white-and-silver-color-background-with-dynamic-diagonal-stripe-lines-and-halftone-texture-modern-and-simple-gray-color-template-banner-design-luxury-and-elegant-concept-eps10-vector.jpg";

export const useCardEditorStore = defineStore("card-editor", () => {
  // Card Editor image state
  const coverImage = ref(DEFAULT_COVER_IMAGE);
  const profilePicImage = ref("");
  const profileLogoImage = ref("");
  const selectedImageToEdit = ref("");
  const isEditingImage = computed(() => selectedImageToEdit.value !== "");
  const imageCropPreview = ref<CropperResult | undefined>();
  const canvas = ref<HTMLCanvasElement | undefined>();
  const defaultCard = {
    firstName: "",
    lastName: "",
    company: "",
    coverImage: "",
    jobTitle: "",
    id: "",
    label: "",
  };
  const newCard = reactive<ICardDTO>({
    ...defaultCard,
  });
  const resetState = () => {
    coverImage.value = "";
    profileLogoImage.value = "";
    profileLogoImage.value = "";
    selectedImageToEdit.value = "";
    
  };

  const openImageEditor = (image: string) => {
    selectedImageToEdit.value = image;
  };

  const removeCoverImage = () => {
    coverImage.value = "";
  };

  const exitImageEditor = () => {
    selectedImageToEdit.value = "";
  };

  const submit = async (card: ICardDTO) => {
    const form = new FormData();
    Object.entries(card).forEach(([key, value]) => {
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
    coverImage,
    profilePicImage,
    profileLogoImage,
    selectedImageToEdit,
    isEditingImage,
    imageCropPreview,
    updateResult,
    canvas,
    submit,
    resetState,
    exitImageEditor,
    removeCoverImage,
    openImageEditor,
  };
});
