import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { databaseConstants } from '../../../common/constants';
import { MongoDBRepository } from '../../../interface/repository/impl/mongo.repository-impl';
import { Projection, Stream } from '../../../interface/repository/repository';
import { IUserRepository } from '../interface/user.repository';
import { User, UserDocument } from '../schema';

type T = UserDocument;

@Injectable()
export class UserRepositoryImpl
  extends MongoDBRepository<T>
  implements IUserRepository
{
  constructor(@InjectModel(User.name) private readonly _: Model<T>) {
    super(_, {
      populateOnFindOne: {
        path: databaseConstants.user.virtualFields.cardsPath,
      },
    });
  }
  public findByEmail(email: string, proj?: Projection): Stream<T> {
    return this.findOne({ email }, proj);
  }
  public existsByEmail(email: string): Stream<boolean> {
    return this.exists({ email });
  }
}
