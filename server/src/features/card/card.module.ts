import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardController } from './controller/card.controller';
import { cardsHooksFactory } from './schema/card.hooks';
import { CardRepository } from './repository/card.repository';
import { CardService } from './service/card.service';
import { CardInitializerService } from './service/card-init.service';
import { MulterModule } from '@nestjs/platform-express';
import { Card } from './schema/card.schema';

@Module({
  controllers: [CardController],
  providers: [CardService, CardRepository, CardInitializerService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Card.name,
        useFactory: cardsHooksFactory,
      },
    ]),
    MulterModule.register({}),
  ],
})
export class CardModule {}
