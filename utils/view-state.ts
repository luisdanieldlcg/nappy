import { AxiosResponse } from "axios";
import { Maybe } from "true-myth";

export type HttpRequest<T> = Promise<AxiosResponse<T>>;
export type FutureOption<T> = Promise<Maybe<T>>;

export class ViewState {
  private loading = ref(false);
  private errorMessage = ref("");
  public showAlert = ref(false);

  // This will update the new state with the returned http data
  public updateWith = async <T>(
    fn: () => HttpRequest<T>,
    hasContent = false
  ): FutureOption<T> => {
    this.setLoading();
    const result = await handleRequest<T>(() => fn());
    this.setIdle();
    return result.mapOrElse(
      (err) => {
        this.setAlert();
        this.setError(err);
        return Maybe.nothing<T>();
      },
      (data) => {
        if (hasContent && !data) {
          this.setAlert();
          this.setError("Something went wrong.");
          return Maybe.nothing<T>();
        }
        this.clearAlert();
        return Maybe.of<T>(data);
      }
    );
  };
  public alert() {
    return this.showAlert.value;
  }
  public isLoading() {
    return this.loading.value;
  }
  public getError() {
    return this.errorMessage.value;
  }
  public setLoading() {
    this.loading.value = true;
  }

  public setIdle() {
    this.loading.value = false;
  }
  public setAlert() {
    this.showAlert.value = true;
  }
  public setError(error: string) {
    this.errorMessage.value = error;
  }
  public clearAlert() {
    this.showAlert.value = false;
  }
}
