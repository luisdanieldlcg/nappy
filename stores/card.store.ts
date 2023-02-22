import { CardDTO } from "~~/api/dtos/card.dto";
export const useCardStore = defineStore("user", () => {
  const cards: CardDTO[] = reactive([]);
  const isLoading = ref(false);
  const errorMessage = ref("");

  const create = async () => {
    const { execute, errorMessage, isLoading } = useCardAPI<CardDTO>(
      CardFunctions.CREATE
    );

    isLoading.value = true;
    const { data } = await execute();
    errorMessage.value = errorMessage.value;
    isLoading.value = false;

    if (!data.value) return;
    cards.push(data.value);
  };
  const fetchAll = async () => {
    const { response, execute } = useCardAPI<CardDTO[]>(
      CardFunctions.GET_BY_USER
    );

    await execute();
    if (response.value?.data) {
      cards.splice(0, cards.length, ...response.value.data);
    }
  };

  const addCard = (card: CardDTO) => {
    if (!card) return;
    cards.push(card);
  };
  return {
    cards,
    fetchAll,
    addCard,
    isLoading,
  };
});
