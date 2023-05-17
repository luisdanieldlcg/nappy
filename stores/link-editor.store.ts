import { CardLink, LinkDTO, phoneNumberLinks } from "~~/api/dtos/card.dto";

// type Link = Omit<LinkDTO, "id">;

export const useLinkEditorStore = defineStore("linkEditor", () => {
  const editing = ref(false);
  const cardEditor = useCardEditorStore();
  const mode = ref<"create" | "edit">("create");
  const indexAtList = ref(-1);

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
    if (mode.value === "create") {
      Object.assign(
        cardEditor.card.links[cardEditor.card.links.length - 1],
        linkPreview
      );
    }
    // For links that are not phone numbers type, a not empty title is enough
    if (!phoneNumberLinks.includes(linkPreview.type)) {
      isValidLink.value = linkPreview.title.length > 0;
    }
  });

  const setCreateMode = (type: CardLink) => {
    mode.value = "create";
    editing.value = true;
    setPreview({
      id: "",
      title: "",
      subtitle: "",
      type,
    });
    const len = cardEditor.card.links.length;
    indexAtList.value = len - 1;
    addLinkToCard();
  };

  const setEditingMode = (link: LinkDTO, index: number) => {
    mode.value = "edit";
    editing.value = true;
    indexAtList.value = index;
    setPreview(link);
  };

  const setPreview = (data: LinkDTO) => {
    linkPreview.id = data.id;
    linkPreview.title = data.title;
    linkPreview.subtitle = data.subtitle;
    linkPreview.type = data.type;
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
      Object.assign(cardEditor.card.links[indexAtList.value], linkPreview);
    }
  };

  return {
    editing,
    linkPreview,
    isValidLink,
    setCreateMode,
    setEditingMode,
    cancel,
    saveInternal,
  };
});
