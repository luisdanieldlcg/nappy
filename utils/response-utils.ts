import { isAxiosError } from "axios";
import { ErrorResponse } from "~~/api/endpoints";

/**
 * Will parse the error message from http call.
 * Additionally handles the case for when we get an array of messages.
 */
export const parseErrorMessage = (err: any): string => {
  const SERVER_ERROR = "Failed to connect to nappy servers.";
  if (!err || !isAxiosError<ErrorResponse>(err)) {
    return SERVER_ERROR;
  }
  const response = err.response;
  const INVALID_STATE =
    "Something went very wrong. Try again or contact with support";
  if (!response || !response.data) {
    return INVALID_STATE;
  }
  const message = response.data.message;
  if (Array.isArray(message)) {
    return message.length === 0 ? INVALID_STATE : message[0];
  }
  return message;
};
