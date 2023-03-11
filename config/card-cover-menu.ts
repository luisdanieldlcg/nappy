import { CardDTO } from "~~/api/dtos/card.dto";
import { DialogStore } from "~~/stores/dialog-store";
import { ViewState } from "~~/utils/view-state";

export interface CardCoverMenuItem {
  title: string;
  navigate?: string;
  clickHandler?: (store: DialogStore, card: CardDTO) => void;
}

export const cardCoverMenuItems: CardCoverMenuItem[] = [
  {
    title: "Edit",
    navigate: "app/cards/create",
  },
  {
    title: "Delete",
    async clickHandler(store: DialogStore, card: CardDTO) {
      // await store.deleteById(card.id, view);
    },
  },
];
