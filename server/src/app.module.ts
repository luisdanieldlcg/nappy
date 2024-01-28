import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerModule } from 'nestjs-pino';

import { pino, mongoose } from './plugins';
import { AuthModule } from './features/auth/auth.module';
import { CardModule } from './features/card/card.module.js';
import { UserModule } from './features/user/user.module';
import EnvironmentConfig from './config/env.config.js';

@Module({
  imports: [
    EnvironmentConfig,
    LoggerModule.forRoot(pino),
    MongooseModule.forRootAsync(mongoose),
    AuthModule,
    CardModule,
    UserModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
