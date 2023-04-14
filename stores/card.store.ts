import { Maybe } from "true-myth";
import { CardDTO } from "~~/api/dtos/card.dto";

/**
 * CardStore definition for passing around functions
 */
export interface CardStore {
  create: (form: FormData) => Promise<void>;
  fetchAll: () => Promise<void>;
  deleteById: (id: string) => Promise<void>;
  getById: (id: string) => Maybe<CardDTO>;
  updateById: (card: CardDTO, form: FormData) => Promise<void>;
}

export const useCardStore = defineStore("user", () => {
  const cards: CardDTO[] = reactive([]);
  const cardModule = useNuxtApp().$api.card;

  onMounted(async () => {
    await getAll();
  });
  // Keeps track of all the loading states.
  const loadTracker = reactive({
    creating: false,
    deletingById: false,
    gettingAll: false,
    gettingById: false,
    updatingById: false,
  });
  /**
   * Creates a new Card.
   * The DTO is sent as part of a FormData in order to
   * handle image upload.
   * @param form FormData
   */
  const create = async (form: FormData) => {
    loadTracker.creating = true;
    const newCard = await cardModule.create(form);
    if (newCard.isOk) {
      cards.push(newCard.value);
      useRouter().replace("/app/cards");
    }
    loadTracker.creating = false;
  };
  /**
   * Fetches all the associated cards with the logged in user.
   */
  const getAll = async () => {
    loadTracker.gettingAll = true;
    const result = await cardModule.getAllByUser();
    loadTracker.gettingAll = false;
    if (result.isOk) {
      cards.splice(0, cards.length, ...result.value);
    }
  };

  const deleteById = async (id: string) => {
    loadTracker.deletingById = true;
    const result = await cardModule.deleteById(id);
    loadTracker.deletingById = false;
    if (result.isOk) {
      const newArray = cards.filter((entry) => entry.id !== id);
      cards.splice(0, cards.length, ...newArray);
    } 
  };


  const deleteAll = async () => {
    loadTracker.deletingById = true;
    const result = await cardModule.deleteAll();
    loadTracker.deletingById = false;
    if (result.isOk) {
      cards.splice(0, cards.length);
    }
  };

  const getById = (id: string): CardDTO | undefined => {
    const result = cards.find((dto) => dto.id === id);
    return result;
  };

  const fetchById = async (id: string) => {
    loadTracker.gettingById = true;
    const result = await cardModule.getById(id);
    loadTracker.gettingById = false;
    if (result.isOk) {
      return result.value;
    }
    return undefined;
  };

  const updateById = async (cardId: string, form: FormData) => {
    loadTracker.updatingById = true;
    const result = await cardModule.updateById(cardId, form);
    loadTracker.updatingById = false;
    if (result.isOk) {
      const i = cards.findIndex((entry) => entry.id === cardId);
      if (i >= 0) {
        cards.splice(i, 1, result.value);
        useRouter().replace("/app/cards");
      }
    }
  };

  return {
    cards,
    getAll,
    create,
    deleteById,
    getById,
    fetchById,
    updateById,
    deleteAll,
    loadTracker,
  };
});
