import { MongoDBRepository } from '../../../interface/repository/impl/mongo.repository-impl';
import { Projection, Stream } from '../../../interface/repository/repository';
import { UserDocument } from '../schema';

type T = UserDocument;

export abstract class IUserRepository extends MongoDBRepository<T> {
  abstract findByEmail(email: string, proj?: Projection): Stream<T>;
  abstract existsByEmail(email: string): Stream<boolean>;
}
