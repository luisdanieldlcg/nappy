export class ISignupDTO {
  email: string;
  password: string;
  passwordConfirm: string;
}
export class ISignupResponse {
  email: string;
  accessToken: string;
}
