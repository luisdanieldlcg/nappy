import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Response } from 'express';
import mainConfig from '../../config/database.config';
import { jwtCookieConstants } from '../constants';

const REFRESH_TOKEN_PATH = '/api/v1/auth/refresh-token';
@Injectable()
export class CookieService {
  constructor(
    @Inject(mainConfig.KEY)
    private readonly config: ConfigType<typeof mainConfig>,
  ) {}

  public setAccessCookie(response: Response, token: string) {
    const minutes = this.config.SESSION_LIFETIME;
    const maxAgeInMS = minutes * 60 * 1000;
    response.cookie(jwtCookieConstants.accessTokenName, token, {
      httpOnly: true,
      secure: false,
      maxAge: maxAgeInMS,
    });
  }

  public setRefreshCookie(response: Response, token: string) {
    const hours = this.config.REFRESH_TOKEN_LIFETIME;
    const maxAgeInMS = hours * 60 * 60 * 1000;
    response.cookie(jwtCookieConstants.refreshTokenName, token, {
      httpOnly: true,
      secure: false,
      path: REFRESH_TOKEN_PATH,
      maxAge: maxAgeInMS,
    });
  }

  public terminateRefreshTokenCookie(response: Response) {
    response.clearCookie(jwtCookieConstants.refreshTokenName, {
      path: REFRESH_TOKEN_PATH,
    });
  }
  public terminateAccessTokenCookie(response: Response) {
    response.clearCookie(jwtCookieConstants.refreshTokenName);
  }
}
