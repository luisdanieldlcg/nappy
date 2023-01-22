export default class ViewState {
  loading: boolean;
  errorMessage: string;
  showAlert: boolean;
  constructor() {
    this.loading = false;
    this.errorMessage = "";
    this.showAlert = false;
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
