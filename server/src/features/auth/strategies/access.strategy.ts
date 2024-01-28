import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { lastValueFrom } from 'rxjs';
import { jwtCookieConstants } from 'src/common/constants';
import mainConfig from '../../../config/database.config';
import { UserService } from '../../user/service/user.service';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { UserPrincipal } from '../interface/user-principal.interface';

const cookieExtractor = (req: Request) => {
  const cookies = req.cookies;

  if (!req || !cookies) {
    return undefined;
  }
  const accessToken = req.cookies[jwtCookieConstants.accessTokenName];
  if (!accessToken) {
    return undefined;
  }
  return accessToken;
};
@Injectable()
export class AccessStrategy extends PassportStrategy(
  Strategy,
  jwtCookieConstants.accessTokenName,
) {
  constructor(
    @Inject(mainConfig.KEY) config: ConfigType<typeof mainConfig>,
    private readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
      ignoreExpiration: false,
      secretOrKey: config.TOKEN_PRIVATE_KEY,
    });
  }

  public async validate(payload: JwtPayload): Promise<UserPrincipal> {
    // This will validate that the user still exists
    // (it could have been deleted and so access should be denied)
    const user = await lastValueFrom(
      this.userService.validateById(payload.sub),
    );

    return {
      id: user._id,
      email: user.email,
    };
  }
}
