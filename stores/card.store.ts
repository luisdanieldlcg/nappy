import { CreateCardDTO, CardDTO } from "~~/api/dtos/card.dto";
import * as api from "~/api/index";
import { makeRequest } from "~~/utils/request";

export const useCardStore = defineStore("card", () => {
  const create = async (dto: CreateCardDTO) => {
    return makeRequest(() => api.createCard(dto));
  };
  return {
    create,
  };
});
