import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface';
import multer, { diskStorage } from 'multer';
import { v4 as uuid_v4 } from 'uuid';
import { from, Observable, of, switchMap } from 'rxjs';
import { FileTypeResult, fromFile } from 'file-type';
import { unlinkSync } from 'fs';
import { BadRequestException } from '@nestjs/common';
import { join } from 'path';

// Type definitions

type SupportedFileExtension = 'png' | 'jpg' | 'jpeg';
type SupportedMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const allowedExtensions: SupportedFileExtension[] = ['png', 'jpg', 'jpeg'];
const allowedMimeTypes: SupportedMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

export const saveImage: MulterOptions = {
  limits: {
    // 5MB
    fileSize: 5 * 1024 * 1024,
  },
  storage: diskStorage({
    destination: './public/images/',
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      if (!extension || !allowedExtensions.includes(extension as any)) {
        return new BadRequestException('Invalid file tyxpe');
      }
      const fileName = uuid_v4() + '.' + extension;
      cb(null, fileName);
    },
  }),
  fileFilter: async (
    req: Express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback,
  ) => {
    // Check if the file extension is allowed
    const extension = file.mimetype.split('/')[1] as SupportedFileExtension;
    if (!allowedExtensions.includes(extension)) {
      // Pass an error message to the callback function
      return cb(
        new BadRequestException(`File type ${extension} is not allowed`),
      );
    }
    // Check if the file mime type is allowed
    const mime = file.mimetype as SupportedMimeType;
    if (!allowedMimeTypes.includes(mime)) {
      // Pass an error message to the callback function
      return cb(new BadRequestException(`Mime type ${mime} is not allowed`));
    }
    // Allow the file to be uploaded
    return cb(null, true);
  },
};

/**
 * Will check if the given file matches its extension
 * @param path
 * @returns Whether the file is legit
 */
export const fileMatchesExtension = (path: string): Observable<boolean> => {
  return from(fromFile(path)).pipe(
    switchMap((result: FileTypeResult) => {
      if (!result) {
        return of(false);
      }
      const ext = result.ext as SupportedFileExtension;
      const mime = result.mime as SupportedMimeType;
      if (!ext || !mime) return of(false);
      const hasValidFileType = allowedExtensions.includes(ext);
      const hasValidMimeType = allowedMimeTypes.includes(mime);
      return of(hasValidFileType && hasValidMimeType);
    }),
  );
};
export const removeImage = (path: string): void => {
  const imagesPath = join(process.cwd(), 'public/images');
  const fullPath = imagesPath + '/' + path;
  try {
    unlinkSync(fullPath);
  } catch (error) {
    console.error('Got an error: ', error);
  }
};

export const imageUploadPath = join(process.cwd(), 'public/images');
