import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoDBRepository } from 'src/interface/repository/impl/mongo.repository-impl';
import { Stream } from '../../../interface/repository/repository';
import { UserPrincipal } from '../../auth/interface/user-principal.interface';
import { CardDTO } from '../dto/card.dto';
import { Card, CardDocument } from '../schema/card.schema';
import { switchMap } from 'rxjs';
import { deleteCardImages } from '../schema/card.hooks';

type T = CardDocument;

@Injectable()
export class CardRepository extends MongoDBRepository<T> {
  constructor(@InjectModel(Card.name) protected readonly cardModel: Model<T>) {
    super(cardModel);
  }
  public findByUser(id: string): Stream<Card[]> {
    return this.find({ createdBy: id });
  }

  public updateById(cardId: string, update: Partial<CardDTO>) {
    return this.update({ _id: cardId }, update, {
      new: true,
    });
  }

  public deleteAll(user: UserPrincipal) {
    const cards = this.findByUser(user.id);

    return cards.pipe(
      switchMap((cards) => {
        cards.forEach((card) => deleteCardImages(card, null));
        return this.deleteMany({ createdBy: user.id });
      }),
    );
  }
}
