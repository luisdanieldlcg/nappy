import { ICardDTO } from "~~/api/dtos/card.dto";
import { DialogStore } from "~~/stores/dialog-store";

export interface CardCoverMenuItem {
  title: string;
  navigate?: string;
  clickHandler?: (store: DialogStore, card: ICardDTO) => void;
}

export const cardCoverMenuItems: CardCoverMenuItem[] = [
  {
    title: "Edit",
    navigate: "app/cards/create",
  },
  {
    title: "Delete",
    async clickHandler(store: DialogStore, card: ICardDTO) {
      // await store.deleteById(card.id, view);
    },
  },
];
