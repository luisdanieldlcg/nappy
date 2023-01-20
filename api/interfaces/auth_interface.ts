export interface AuthRequest {
  email: string;
  password: string;
  onSuccess: (response: AuthResponse) => void;
  onError: (error: AppResponse) => void;
}
export interface AppResponse {
  message: string;
  status: Status;
}
export interface AuthResponse extends AppResponse {
  token: string;
}

export enum Status {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}
