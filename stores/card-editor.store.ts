import { LinkDefinition, LinkType } from "~~/api/dtos/card.dto";

export enum ImageType {
  Cover,
  Avatar,
}
export interface LinkListTile {
  title: string;
  subtitle: string;
  type: LinkType;
}
export type Card = {
  firstName: string;
  lastName: string;
  company: string;
  jobTitle: string;
  label: string;
  coverImage: Blob | string | null;
  avatarImage: Blob | string | null;
  color: string;
  links: LinkListTile[];
};
export const useCardEditorStore = defineStore("cardEditor", () => {
  const defaultCard: Card = {
    firstName: "Luis",
    lastName: "de la Cruz",
    company: "",
    jobTitle: "",
    label: "Work",
    coverImage: null,
    avatarImage: null,
    color: Colors.greyLight,
    links: [],
  };
  const coverImagePreview = ref("");
  const avatarImagePreview = ref("");

  const card = reactive<Card>({
    ...defaultCard,
  });
  // Controls the view of the card editor.
  const view = ref(0);

  // Whether the user is editing an image.
  const isEditingImage = ref(false);
  const imageDropDialog = ref(false);

  const removeCoverImage = () => {
    card.coverImage = null;
  };

  const createForm = () => {
    const form = new FormData();
    Object.entries(card).forEach(([key, value]) => {
      if (!value) {
        form.append(key, "");
        return;
      }
      if (Array.isArray(value)) {
        form.append(key, JSON.stringify(value));
        return;
      }
      form.append(key, value);
    });
    return form;
  };

  const setCard = (newCard: Card) => {
    Object.assign(card, newCard);
    coverImagePreview.value = card.coverImage as string;
    avatarImagePreview.value = card.avatarImage as string;
  };

  // Called when the editor is closed.
  // This can be used to reset card editor values.
  const onEditorClosed = () => {
    view.value = 0;
  };
  return {
    card,
    isEditingImage,
    imageDropDialog,
    coverImagePreview,
    avatarImagePreview,
    createForm,
    removeCoverImage,
    setCard,
    onEditorClosed,
    view,
  };
});
