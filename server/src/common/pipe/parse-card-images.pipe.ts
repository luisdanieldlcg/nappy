import { PipeTransform } from '@nestjs/common';
import { UploadedCardImages } from '../types';
import {
  fileMatchesExtension,
  imageUploadPath,
  removeImage,
} from '../helpers/image-upload';
import { lastValueFrom, tap } from 'rxjs';
import { InvalidImageFormatException } from '../exceptions/app.exceptions';
import { join } from 'path';

export class ParseCardImagesPipe implements PipeTransform<UploadedCardImages> {
  async transform(value: UploadedCardImages) {
    // If no images are uploaded, return undefined
    if (!value.avatarImage && !value.coverImage) {
      return {
        avatarImage: undefined,
        coverImage: undefined,
      };
    }
    const path = imageUploadPath;
    const output = {
      avatarImage: undefined,
      coverImage: undefined,
    };
    // Validate avatar image
    const avatar = value.avatarImage ? value.avatarImage[0] : undefined;
    if (avatar) {
      const avatarPath = join(path + '/', avatar.filename);
      const isLegitAvatar = await lastValueFrom(removeIfInvalid(avatarPath));
      output.avatarImage = isLegitAvatar ? avatar.filename : undefined;
    }
    // Validate cover image
    const cover = value.coverImage ? value.coverImage[0] : undefined;
    if (cover) {
      const coverPath = join(path + '/', cover.filename);
      const isLegitCover = await lastValueFrom(removeIfInvalid(coverPath));
      output.coverImage = isLegitCover ? cover.filename : undefined;
    }

    return output;
  }
}

export const removeIfInvalid = (fullPath: string) => {
  return fileMatchesExtension(fullPath).pipe(
    tap((isValid) => {
      if (!isValid) {
        removeImage(fullPath);
        throw new InvalidImageFormatException();
      }
    }),
  );
};
