import { ConflictException, Injectable, Logger } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';

import { UserService } from '../../user/service/user.service';

import { EMPTY, from, map, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';
import { LoginDto, SignupDto } from '../dtos';
import { User } from '../../user/schema';
import { SettingsService } from '../../../common/services/settings.service';
import { JwtPayload } from '../interface/jwt-payload.interface';
import { InvalidCredentialsException } from '../../../common/exceptions/app.exceptions';

export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
}
// TODO: handle user not found exception properly
@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly settings: SettingsService,
  ) {}

  /**
   * Register a new user with email and password
   * @param dto SignupDTO
   * @returns TokenResponse
   */
  public register(dto: SignupDto): Observable<TokenResponse> {
    return this.userService.existsByEmail(dto.email).pipe(
      mergeMap((exists) => {
        if (exists) {
          throw new ConflictException('Email already exists');
        }
        return this.userService.create(dto).pipe(
          mergeMap((user) => {
            return this.logIn(user);
          }),
        );
      }),
    );
  }

  /**
   * Logs in the given user by emitting new access
   * and refresh tokens. Must be called after `validateUser`.
   * @param user User
   * @returns TokenResponse
   */
  public logIn(user: User): Observable<TokenResponse> {
    const payload: JwtPayload = {
      sub: user._id,
      email: user.email,
    };
    // Sign access token
    const signAccess = this.jwtService.signAsync(
      payload,
      this.settings.jwtAccessToken(),
    );
    // Sign refresh token
    const signRefresh = this.jwtService.signAsync(
      payload,
      this.settings.jwtRefreshToken(),
    );
    const tokens = Promise.all([signAccess, signRefresh]);
    // Create an Observable of TokenResponse
    return from(tokens).pipe(
      map(([accessToken, refreshToken]) => {
        const response: TokenResponse = {
          accessToken,
          refreshToken,
        };
        return response;
      }),
    );
  }

  /**
   * Validates the user for email and password login.
   *
   * The email and password must match with the database record.
   *
   * If the user is not found or the password is incorrect
   * it will throw an error.
   *
   * @param dto LoginDTO
   * @returns User
   */
  public validateUser(dto: LoginDto): Observable<User> {
    // Find the user by email and include the password
    return (
      this.userService
        // Select email and password
        .findByEmail(dto.email, { email: 1, password: 1 })
        .pipe(
          // If the user is not found, set an empty stream
          mergeMap((user) => (user ? of(user) : EMPTY)),

          // Detailed info could be helpful for crackers
          // Thus we are using a generic message.
          throwIfEmpty(() => new InvalidCredentialsException()),
          // We know the user is present
          mergeMap((user) => {
            return user.comparePassword(dto.password).pipe(
              map((didMatch) => {
                if (!didMatch) {
                  throw new InvalidCredentialsException();
                }
                return user;
              }),
            );
          }),
        )
    );
  }
  // public async login(dto: LocalSignInDTO) {
  //   const user = await this.userService.findByEmailWithPassword(dto.email);
  //   if (!user) {
  //     throw new InvalidCredentialsException();
  //   }
  //   const didMatch = await checkHash({
  //     raw: dto.password,
  //     hash: user.password,
  //   });
  //   if (!didMatch) {
  //     throw new InvalidCredentialsException();
  //   }
  //   const tokens = await this.processTokens(user);
  //   this.logger.log('Signed in successfully');
  //   return {
  //     email: user.email,
  //     ...tokens,
  //   };
  // }

  // public async logout(userId: string) {
  //   // Only retrieve user data if refresh token is present
  //   // TODO filter for refresh token != null
  //   const user = await this.userService.findById(userId);
  //   user.refreshToken = undefined;
  //   await user.save({ validateBeforeSave: false });
  // }

  // /**
  //  * Further processing to Verify that the access token
  //  * sent by the client is still valid. The token payload
  //  * passed in is assumed to be a valid token.
  //  * @param dto
  //  */
  // public async verifyAccessToken(dto: AccessTokenPayload) {
  //   const user = await this.userService.findById(dto.id);
  //   // Check if the user still exists
  //   if (!user) {
  //     throw new HttpException(
  //       'The user belonging to this token was not found',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   return {};
  //   // TODO: Check if user changed password after the token was issued
  // }
  // public async refreshToken(dto: RefreshTokenDTO) {
  //   const user = await this.userService.findById(dto.id);
  //   if (!user) {
  //     throw new HttpException(
  //       'The user belonging to this token was not found',
  //       HttpStatus.UNAUTHORIZED,
  //     );
  //   }
  //   const didRefreshTokenMatch = await checkHash({
  //     raw: dto.token,
  //     hash: user.refreshToken,
  //   });
  //   if (!didRefreshTokenMatch) {
  //     throw new UnauthorizedException('Access denied. Please log in again.');
  //   }
  //   const tokens = await this.processTokens(user);
  //   return tokens;
  // }

  // private async processTokens(user: User): Promise<Tokens> {
  //   const tokens = await this.genTokens(user._id);
  //   user.refreshToken = await makeHash(tokens.refreshToken, tokenHashRounds);
  //   await user.save({ validateBeforeSave: false });
  //   return tokens;
  // }

  // /**
  //  * Create refresh and access tokens
  //  * @param id The user identifier of this token
  //  * @returns An object containing both tokens.
  //  */
  // private async genTokens(id: string): Promise<Tokens> {
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync({ id }, this.settings.jwtAccessToken()),
  //     this.jwtService.signAsync({ id }, this.settings.jwtRefreshToken()),
  //   ]);
  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }
}
