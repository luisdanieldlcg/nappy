export interface RawResponse {
  message: string;
  status: Status;
}

export interface RawRequest {
  onSuccess: (response: RawResponse) => void;
  onError: (error: RawResponse) => void;
}

export interface LoginRequest extends RawRequest {
  email: string;
  password: string;
}
export interface SignupRequest extends LoginRequest {
  passwordConfirm: string;
}

export interface AuthResponse extends RawResponse {
  token: string;
}

export enum Status {
  SUCCESS = "success",
  FAIL = "fail",
  ERROR = "error",
}
export const serverError: RawResponse = {
  message:
    "Could not connect to Nappy servers. Try again or contact with support.",
  status: Status.ERROR,
};
