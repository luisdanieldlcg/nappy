import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { databaseConstants } from 'src/common/constants';
import { IUserRepository } from 'src/features/user/interface/user.repository';
import { userHooksFactory } from './schema/user.hooks';
import { UserRepositoryImpl } from './repository/user.repository';
import { UserService } from './service/user.service';
import { UserController } from './controller/user.controller';
import { UserInitializerService } from './service/user-init.service';

@Module({
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: databaseConstants.user.name,
        useFactory: userHooksFactory,
      },
    ]),
  ],
  providers: [
    UserInitializerService,
    UserService,
    {
      provide: IUserRepository,
      useClass: UserRepositoryImpl,
    },
  ],

  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
