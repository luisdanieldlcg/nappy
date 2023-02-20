import { CardDTO } from "~~/api/dtos/card.dto";
import { useCardStore } from "./card.store";

export const useUserStore = defineStore("user", () => {
  const cards: CardDTO[] = reactive([]);
  const cardStore = useCardStore();

  const fetchAll = async () => {
    const result = await cardStore.findAll();
    result.match({
      Ok(value) {
        cards.splice(0, cards.length, ...value);
      },
      Err(error) {
        console.log("Failed to fetch cards: " + error);
      },
    });
  };
  return {
    cards,
    fetchAll,
  };
});
