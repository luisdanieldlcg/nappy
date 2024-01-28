import { Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthController } from './controller/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { AccessStrategy } from './strategies/access.strategy';
import { RefreshStrategy } from './strategies/refresh.strategy';
import { UserModule } from '../user/user.module';
import { SettingsService } from '../../common/services/settings.service';
import { CookieService } from '../../common/services/cookie.service';

@Module({
  imports: [UserModule, JwtModule.register({})],
  providers: [
    AuthService,
    AccessStrategy,
    RefreshStrategy,
    SettingsService,
    CookieService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
