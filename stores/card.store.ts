import { Maybe } from "true-myth";
import { createCard, deleteCard, updateCard } from "~~/api";
import { ICardDTO } from "~~/api/dtos/card.dto";
import { ViewState } from "~~/utils/view-state";

/**
 * CardStore definition for passing around functions
 */
export interface CardStore {
  create: (form: FormData, screen: ViewState) => Promise<void>;
  fetchAll: (screen: ViewState) => Promise<void>;
  deleteById: (id: string, screen: ViewState) => Promise<void>;
  getById: (id: string) => Maybe<ICardDTO>;
  updateById: (
    card: ICardDTO,
    form: FormData,
    screen: ViewState
  ) => Promise<void>;
}

export const useCardStore = defineStore("user", () => {
  const cards: ICardDTO[] = reactive([]);
  const isFetching = ref(false);
  const cardModule = useNuxtApp().$api.card;

  /**
   * Creates a new Card.
   * The DTO is sent as part of a FormData in order to
   * handle image upload.
   * @param form FormData
   */
  const create = async (form: FormData, screen: ViewState) => {
    const newCard = await cardModule.create(form);
    // const newCard = await screen.updateWith<ICardDTO>(() => createCard(form));
    if (newCard.isOk) {
      cards.push(newCard.value);
      useRouter().replace("/app/cards");
    }
  };
  /**
   * Fetches all the associated cards with the logged in user.
   */
  const getAll = async () => {
    isFetching.value = true;
    const result = await cardModule.getAllByUser();
    isFetching.value = false;
    if (result.isOk) {
      cards.splice(0, cards.length, ...result.value);
    }
  };
  const deleteById = async (id: string, screen: ViewState) => {
    const result = await screen.updateWith(() => deleteCard(id), false);
    if (result.isJust) {
      const newArray = cards.filter((entry) => entry.id !== id);
      cards.splice(0, cards.length, ...newArray);
    }
  };

  const getById = (id: string): Maybe<ICardDTO> => {
    return Maybe.of(cards.find((dto) => dto.id === id));
  };

  const updateById = async (
    card: ICardDTO,
    form: FormData,
    screen: ViewState
  ) => {
    const result = await screen.updateWith<ICardDTO>(() =>
      updateCard(card.id, form)
    );
    if (result.isJust) {
      const i = cards.indexOf(card);
      if (i >= 0) {
        cards.splice(i, 1, result.value);
        useRouter().replace("/app/cards");
      }
    }
  };
  const waitUntilFetch = async () => {
    return new Promise<void>((resolve) => {
      const loop = setInterval(() => {
        if (!isFetching.value) {
          clearInterval(loop);
          resolve();
        }
      }, 150);
    });
  };

  return {
    cards: cards,
    fetchAll: getAll,
    create,
    deleteById,
    getById,
    updateById,
    waitUntilFetch,
  };
});
