export const useCardEditorStore = defineStore("card-editor", () => {
  const profilePicImage = ref<undefined | string>();
  return {
    profilePicImage,
  };
});
