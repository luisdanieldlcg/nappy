import {
  Document,
  FilterQuery,
  Model,
  PopulateOptions,
  QueryOptions,
  UpdateQuery,
} from 'mongoose';
import { Filter, IRepository, Projection, Stream } from '../repository';
import { from, map, Observable } from 'rxjs';

type RepositoryOptions = {
  populateOnFindOne?: PopulateOptions;
  populateOnFindAll?: PopulateOptions;
};
export abstract class MongoDBRepository<M extends Document>
  implements IRepository<M>
{
  constructor(
    protected readonly entity: Model<M>,
    protected readonly opts: RepositoryOptions = {},
  ) {}

  public create(dto: object): Observable<M> {
    return from(this.entity.create(dto));
  }

  public find(filter?: Filter<M>): Stream<M[]> {
    return from(this.entity.find(filter).exec());
  }
  public findOne(filter?: Filter<M>, proj?: Projection): Stream<M> {
    return from(this.entity.findOne(filter, proj).exec());
  }

  public findById(id: string): Stream<M> {
    return from(this.entity.findById(id).exec());
  }

  public exists(filter: Filter<M>): Stream<boolean> {
    return from(this.entity.exists(filter).exec()).pipe(
      map((exists) => exists != null),
    );
  }
  public deleteById(id: string) {
    return from(this.entity.findByIdAndDelete(id).exec());
  }
  public deleteMany(filter?: Filter<M>) {
    return from(this.entity.deleteMany(filter).exec());
  }

  public update(
    filter: FilterQuery<M>,
    update: UpdateQuery<M>,
    queryOptions?: QueryOptions<M>,
  ): Stream<M> {
    return from(
      this.entity.findOneAndReplace(filter, update, queryOptions).exec(),
    );
  }
}
