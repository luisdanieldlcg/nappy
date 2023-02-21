import { HttpMethod } from "~~/utils/http-method";

export enum CardFunctions {
  CREATE,
  GET_BY_USER,
}
const findHttpMethod = (fn: CardFunctions) => {
  switch (fn) {
    case CardFunctions.CREATE:
      return HttpMethod.POST;
    case CardFunctions.GET_BY_USER:
      return HttpMethod.GET;
  }
};
export function useCardAPI<T>(fn: CardFunctions) {
  return useAPI<T>({
    resource: Resource.CARDS,
    method: findHttpMethod(fn),
    endpoint: "/",
    lazy: true,
  });
}
