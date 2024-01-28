import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtSignOptions } from '@nestjs/jwt';
import mainConfig from 'src/config/database.config';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(mainConfig.KEY)
    private readonly config: ConfigType<typeof mainConfig>,
  ) {}

  public jwtAccessToken(): JwtSignOptions {
    const minutes = this.config.SESSION_LIFETIME;
    return {
      privateKey: this.config.TOKEN_PRIVATE_KEY,
      expiresIn: minutes * 60,
    };
  }
  public jwtRefreshToken(): JwtSignOptions {
    const hours = this.config.REFRESH_TOKEN_LIFETIME;
    return {
      privateKey: this.config.TOKEN_PRIVATE_KEY,
      expiresIn: hours * 60 * 60,
    };
  }
}
