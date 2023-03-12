import { ILoginDTO, ILoginResponse } from "../dtos/login.dto";
import { ISignupDTO, ISignupResponse } from "../dtos/signup.dto";
import { ApiModule  } from "./module";

export class AuthModule extends ApiModule {

  private static RESOURCE = "auth";

  protected getResource(): string {
    return AuthModule.RESOURCE;
  }

  public async login(credentials: ILoginDTO) {
    return await this.post<ILoginResponse>({
      data: credentials,
      endpoint: "/login",
    });
  }

  public async signup(dto: ISignupDTO) {
    return await this.post<ISignupResponse>({
      data: dto,
      endpoint: "/signup",
    });
  }
}
