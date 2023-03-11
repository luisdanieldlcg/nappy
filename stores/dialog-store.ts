import { HttpRequest, ViewState } from "~~/utils/view-state";

export interface DialogStore {
  view: {
    updateWith: <T>(fn: () => HttpRequest<T>) => Promise<T>;
  };
}``
export const useDialogStore = defineStore("dialog", () => {
  const view = new ViewState();
  const show = ref(false);

  const open = () => {
    show.value = true;
  };
  const close = () => {
    show.value = false;
  };
  return {
    open,
    close,
    view,
  };
});

