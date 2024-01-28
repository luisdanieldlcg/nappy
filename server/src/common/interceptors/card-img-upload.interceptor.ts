import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { saveImage } from '../helpers/image-upload';

// Will throw unexpected field error if the file field has another name

export class CardImagesInterceptor extends FileFieldsInterceptor(
  [
    {
      name: 'coverImage',
      maxCount: 1,
    },
    {
      name: 'avatarImage',
      maxCount: 1,
    },
  ],
  saveImage,
) {}
