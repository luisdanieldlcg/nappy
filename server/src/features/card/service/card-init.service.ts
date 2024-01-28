import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Card } from '../schema/card.schema';

@Injectable()
export class CardInitializerService implements OnModuleInit {
  constructor(@InjectModel(Card.name) protected readonly model: Model<Card>) {}
  public async onModuleInit() {
    console.log('(CardModule) Initializing');
    await this.model.deleteMany({});
  }
}
