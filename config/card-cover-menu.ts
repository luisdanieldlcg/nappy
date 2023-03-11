import { Store } from "pinia";

interface CardCoverMenuItem {
  title: string;
  navigate?: string;
  onClick?: (store: Store<"">) => void;
}

export const cardCoverMenuItems: CardCoverMenuItem[] = [
  {
    title: "Edit",
    navigate: "app/cards/create",
  },
  {
    title: "Delete",
    onClick(x: Store) {
      console.log("onClick()");
    },
  },
];
