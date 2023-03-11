import { ILoginDTO, ILoginResponse } from "../dtos/login.dto";
import { SignupDTO } from "../dtos/signup.dto";
import { ApiModule as Module } from "./module";

export class AuthModule extends Module {
  private static RESOURCE = "auth";

  public getResource(): string {
    return AuthModule.RESOURCE;
  }

  public async login(credentials: ILoginDTO) {
    return await this.post<ILoginResponse>({
      data: credentials,
      endpoint: "/login",
    });
  }

  public async signup(dto: SignupDTO) {}
}
