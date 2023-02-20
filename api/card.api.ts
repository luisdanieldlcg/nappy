import { CardEndpoint } from "./endpoints";
import { CreateCardDTO, CardDTO } from "./dtos/card.dto";

/**
 * @url POST /cards/
 * @param dto CardTO
 * @since 1.0
 */
export const createCard = (dto: CreateCardDTO) => {
  return CardEndpoint.post<CardDTO>("/", dto);
};

/**
 * @url GET /cards/
 * @param dto CardTO
 * @since 1.0
 */
export const findAllByUser = () => {
  return CardEndpoint.get<CardDTO[]>("/");
};
