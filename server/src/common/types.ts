import { PropOptions } from '@nestjs/mongoose';
import { Result } from 'oxide.ts/dist';
import { RepositoryError } from './errors/repository.error';

export type SchemaRule = PropOptions<any>;
export type Projection = Record<string, any>;
export type Future<T> = Promise<Result<T, RepositoryError>>;
export type UploadedCardImages = {
  coverImage?: Express.Multer.File[];
  avatarImage?: Express.Multer.File[];
};
export type CardImages = {
  coverImage?: string;
  avatarImage?: string;
};
