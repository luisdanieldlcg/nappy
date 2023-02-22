import axios from "axios";
import { API_BASE_URL } from "~~/config/url";
import { CreateCardDTO, CardDTO } from "./dtos/card.dto";

const AUTH_API_URL = API_BASE_URL + "auth";

const API = axios.create({
  baseURL: AUTH_API_URL,
  withCredentials: true,
});

/**
 * @url POST /cards/
 * @param dto CardTO
 * @since 1.0
 */
export const createCard = (dto: CreateCardDTO) => {
  return API.post<CardDTO>("/", dto);
};

/**
 * @url GET /cards/
 * @param dto CardTO
 * @since 1.0
 */
export const findAllByUser = () => {
  return API.get<CardDTO[]>("/");
};
