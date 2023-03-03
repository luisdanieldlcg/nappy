import axios from "axios";
import { API_BASE_URL } from "~~/config/url";
import { CreateCardDTO, CardDTO } from "./dtos/card.dto";

const CARD_API_URL = API_BASE_URL + "cards";

const API = axios.create({
  baseURL: CARD_API_URL,
  withCredentials: true,
});

/**
 * @url POST /cards/
 * @param dto CardTO
 * @since 1.0
 */
export const createCard = (dto: FormData) => {
  return API.post<CardDTO>("/", dto, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

/**
 * @url GET /cards/
 * @param dto CardTO
 * @since 1.0
 */
export const findAllByUser = () => {
  return API.get<CardDTO[]>("/");
};

export const deleteCard = (cardId: string) => {
  return API.delete(`/${cardId}`);
};

export const updateCard = (card: CardDTO) => {
  return API.patch<CardDTO>(`${card.id}`, card);
};
