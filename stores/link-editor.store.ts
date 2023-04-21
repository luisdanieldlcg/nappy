import { LinkDTO, phoneNumberLinks } from "~~/api/dtos/card.dto";

// type Link = Omit<LinkDTO, "id">;

export const useLinkEditorStore = defineStore("linkEditor", () => {
  const editing = ref(false);
  const cardEditor = useCardEditorStore();
  const mode = ref<"create" | "edit">("create");

  const linkPreview = reactive<LinkDTO>({
    id: "",
    title: "",
    subtitle: "",
    type: "email",
  });

  const isValidLink = ref(false);

  // Get a reference to the card editor link from the cards array
  // and update it with the new values
  watch(linkPreview, () => {
    const len = cardEditor.card.links.length;
    if (mode.value === "create") {
      Object.assign(cardEditor.card.links[len - 1], linkPreview);
    }

    // For links that are not phone numbers type, a not empty title is enough
    if (!phoneNumberLinks.includes(linkPreview.type)) {
      isValidLink.value = linkPreview.title.length > 0;
    }
  });

  const setEditing = (data: { link: LinkDTO; mode: "create" | "edit" }) => {
    editing.value = true;
    mode.value = data.mode;
    linkPreview.id = data.link.type + ":" + Math.random().toString(36);
    linkPreview.title = data.link.title;
    linkPreview.subtitle = data.link.subtitle;
    linkPreview.type = data.link.type;
    if (mode.value === "create") {
      addLinkToCard();
    }
  };

  const cancel = () => {
    editing.value = false;
    if (mode.value === "create") {
      cardEditor.card.links.pop();
    }
  };

  const addLinkToCard = () => {
    cardEditor.card.links.push({
      id: "",
      title: linkPreview.title,
      subtitle: linkPreview.subtitle,
      type: linkPreview.type,
    });
  };

  const saveInternal = () => {
    if (mode.value === "edit") {
      const i = cardEditor.card.links.findIndex(
        (link) => link.id === linkPreview.id
      );
      console.log(i);
      Object.assign(cardEditor.card.links[i], linkPreview);
    }
  };

  return {
    editing,
    linkPreview,
    isValidLink,
    setEditing,
    cancel,
    saveInternal,
  };
});
