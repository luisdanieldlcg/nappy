export default class ViewState {
  loading: boolean;
  errorMessage: string;
  constructor() {
    this.loading = false;
    this.errorMessage = "";
  }

  hasError() {
    return this.errorMessage.length > 0;
  }
  isLoading() {
    return this.loading;
  }
  setLoading(val: boolean) {
    this.loading = val;
  }
  setErrorMsg(msg: string) {
    this.errorMessage = msg;
  }
  clear(): void {
    this.errorMessage = "";
  }
  // Fix POJO cast warning
  toJSON() {
    return {
      loading: this.loading,
      errorMessage: this.errorMessage,
    };
  }
}
