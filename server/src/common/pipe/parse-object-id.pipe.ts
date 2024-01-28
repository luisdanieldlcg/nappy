import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';

import mongoose from 'mongoose';

export class ParseObjectIdPipe implements PipeTransform {
  /// Will parse mongoose ObjectId from request parameter.
  transform(value: any, metadata: ArgumentMetadata) {
    if (!mongoose.isValidObjectId(value)) {
      throw new BadRequestException(`${metadata.data} must be an ObjectId`);
    }

    return value;
  }
}
