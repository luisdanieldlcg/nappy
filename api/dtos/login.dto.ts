export class Input {}
export class ILoginDTO extends Input {
  email: string;
  password: string;
}
export class ILoginResponse {
  email: string;
  accessToken: string;
}
