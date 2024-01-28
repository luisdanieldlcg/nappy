import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from '../../auth/dtos';
import { User } from '../schema';

@Injectable()
export class UserInitializerService implements OnModuleInit {
  constructor(@InjectModel(User.name) protected readonly model: Model<User>) {}
  public async onModuleInit() {
    console.log('(UserModule) Initializing');
    const user: SignupDto = {
      email: 'admin@example.com',
      password: '12345678',
      passwordConfirm: '12345678',
      firstName: 'Luis',
      lastName: 'de la Cruz',
    };
    await this.model.deleteMany({});
    await this.model.create(user).then((data) => console.log(data));
  }
}
