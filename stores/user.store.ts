import { CardDTO } from "~~/api/dtos/card.dto";

export const useUserStore = defineStore("user", () => {
  const cards: CardDTO[] = reactive([]);

  const fetchAll = async () => {
    const { response, execute } = useCardAPI<CardDTO[]>(
      CardFunctions.GET_BY_USER
    );
    await execute();
    if (response.value?.data) {
      cards.splice(0, cards.length, ...response.value.data);
    }
  };

  return {
    cards,
    fetchAll,
  };
});
