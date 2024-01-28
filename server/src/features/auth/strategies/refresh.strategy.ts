import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';
import { jwtCookieConstants } from 'src/common/constants';
import { RefreshTokenDTO } from '../dtos';

export type RefreshTokenPayload = {
  id: string;
  // Issued At
  iat: number;
  // Expiration Time.
  exp: number;
};

export const cookieExtractor = (req: Request) => {
  const cookies = req.cookies;
  if (!req || !cookies) {
    return undefined;
  }
  const refreshToken = req.cookies[jwtCookieConstants.refreshTokenName];
  if (!refreshToken) {
    return undefined;
  }
  return refreshToken;
};

@Injectable()
export class RefreshStrategy extends PassportStrategy(
  Strategy,
  jwtCookieConstants.refreshTokenName,
) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      passReqToCallback: true,
      secretOrKey: 'secret',
    });
  }

  validate(req: Request, payload: RefreshTokenPayload) {
    const dto: RefreshTokenDTO = {
      exp: payload.exp,
      id: payload.id,
      iat: payload.iat,
      token: cookieExtractor(req),
    };
    return dto;
  }
}
