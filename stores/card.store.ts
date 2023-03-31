import { Maybe } from "true-myth";
import { ICardDTO } from "~~/api/dtos/card.dto";

/**
 * CardStore definition for passing around functions
 */
export interface CardStore {
  create: (form: FormData) => Promise<void>;
  fetchAll: () => Promise<void>;
  deleteById: (id: string) => Promise<void>;
  getById: (id: string) => Maybe<ICardDTO>;
  updateById: (card: ICardDTO, form: FormData) => Promise<void>;
}

export const useCardStore = defineStore("user", () => {
  const cards: ICardDTO[] = reactive([]);
  const cardModule = useNuxtApp().$api.card;

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

  const getById = (id: string): ICardDTO | undefined => {
    loadTracker.gettingById = true;
    const result = cards.find((dto) => dto.id === id);
    loadTracker.gettingById = false;
    return result;
  };

  const updateById = async (card: ICardDTO, form: FormData) => {
    // loadTracker.updatingById = true;
    // const result = await screen.updateWith<ICardDTO>(() =>
    //   updateCard(card.id, form)
    // );
    // loadTracker.updatingById = false;
    // if (result.isJust) {
    //   const i = cards.indexOf(card);
    //   if (i >= 0) {
    //     cards.splice(i, 1, result.value);
    //     useRouter().replace("/app/cards");
    //   }
    // }
  };
  // const waitUntilFetch = async () => {
  //   return new Promise<void>((resolve) => {
  //     const loop = setInterval(() => {
  //       if (!isFetching.value) {
  //         clearInterval(loop);
  //         resolve();
  //       }
  //     }, 150);
  //   });
  // };

  return {
    cards,
    getAll,
    create,
    deleteById,
    getById,
    updateById,
    loadTracker,
    // waitUntilFetch,
  };
});
