import { LinkDTO } from "~~/api/dtos/card.dto";

type Link = Omit<LinkDTO, "id">;

export const useLinkEditorStore = defineStore("linkEditor", () => {
  const editing = ref(false);
  const cardEditor = useCardEditorStore();
  const mode = ref<"create" | "edit">("create");

  const linkPreview = reactive<Link>({
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
  });

  const setEditing = (data: { link: Link; mode: "create" | "edit" }) => {
    editing.value = true;
    mode.value = data.mode;
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

  return {
    editing,
    linkPreview,
    isValidLink,
    setEditing,
    cancel,
  };
});
