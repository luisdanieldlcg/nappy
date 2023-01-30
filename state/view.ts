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
  setErrorMsg(msg: string | string[]) {
    if (Array.isArray(msg)) {
      this.errorMessage = ViewState.format(msg[0]);
    } else {
      this.errorMessage = ViewState.format(msg);
    }
  }
  private static format(data: string): string {
    return data.charAt(0).toUpperCase() + data.slice(1);
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
