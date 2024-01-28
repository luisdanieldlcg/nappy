import { CardLink, LinkDTO } from "~~/api/dtos/card.dto";

export enum ImageType {
  Cover,
  Avatar,
}
export type Card = {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  label: string;
  coverImage: string;
  avatarImage: string;
  color: string;
  links: LinkDTO[];
  useNativeIcons: boolean;
};
export const useCardEditorStore = defineStore("cardEditor", () => {
  const defaultCard: Card = {
    firstName: "Luis",
    lastName: "de la Cruz",
    company: "",
    jobTitle: "",
    label: "Work",
    coverImage: "",
    avatarImage: "",
    color: Colors.greyLight,
    links: [],
    useNativeIcons: false,
  };

  const card = reactive<Card>({
    ...defaultCard,
  });

  // Multipart form receives a Blob, so we need to store it.
  const avatarImageBlob = ref<Blob | null>(null);
  const coverImageBlob = ref<Blob | null>(null);

  // Controls the view of the card editor.
  const view = ref(0);

  // Whether the user is editing an image.
  const isEditingImage = ref(false);
  const imageDropDialog = ref(false);

  const removeCoverImage = () => {
    card.coverImage = "";
  };

  const createForm = () => {
    const form = new FormData();
    Object.entries(card).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value));
        return;
      }
      // send cover image and avatar image as blobs
      if (key === "coverImage" && coverImageBlob.value) {
        form.append(key, coverImageBlob.value);
        return;
      }
      if (key === "avatarImage" && avatarImageBlob.value) {
        form.append(key, avatarImageBlob.value);
      }
      form.append(key, value as string | Blob);
    });
    return form;
  };

  const setCard = (newCard: Card) => {
    Object.assign(card, newCard);
  };

  // Called when the editor is closed.
  // This can be used to reset card editor values.
  const onEditorClosed = () => {
    view.value = 0;
  };

  const handleTabChanges = () => {
    if (!card.links.at(-1)?.title) {
      useLinkEditorStore().cancel();
    }
  };

  return {
    card,
    isEditingImage,
    imageDropDialog,
    avatarImageBlob,
    coverImageBlob,
    createForm,
    removeCoverImage,
    setCard,
    onEditorClosed,
    view,
    handleTabChanges,
  };
});
