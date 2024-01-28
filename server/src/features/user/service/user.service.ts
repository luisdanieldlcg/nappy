import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { EMPTY, mergeMap, Observable, of, throwIfEmpty } from 'rxjs';
import { IUserRepository } from 'src/features/user/interface/user.repository';
import { Projection } from '../../../common/types';
import { SignupDto } from '../../auth/dtos';
import { User } from '../schema';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly userRepository: IUserRepository) {}

  public create(dto: SignupDto): Observable<User> {
    return this.userRepository.create({
      ...dto,
    });
  }
  public findById(id: string) {
    return this.userRepository.findById(id);
  }

  public findByEmail(email: string, includeOrExclude: Projection) {
    return this.userRepository.findByEmail(email, includeOrExclude);
  }
  public existsByEmail(email: string) {
    return this.userRepository.existsByEmail(email);
  }
  public findAll() {
    return this.userRepository.find({});
  }

  public validateById(id: string) {
    return this.findById(id).pipe(
      // If the user is not found, set an empty stream
      mergeMap((user) => (user ? of(user) : EMPTY)),

      // Detailed info could be helpful for crackers
      // Thus we are using a generic message.
      throwIfEmpty(
        () => new NotFoundException('The requested user was not found'),
      ),
    );
  }
}
