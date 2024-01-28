import { HttpException, HttpStatus } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';

export class InvalidCredentialsException extends HttpException {
  constructor() {
    super('Either the email or password is incorrect.', HttpStatus.BAD_REQUEST);
  }
}

export class InvalidImageFormatException extends BadRequestException {
  constructor() {
    super('The file must be of one of these formats: PNG, JPG, JPEG.');
  }
}
export class ImageFormatMismatchException extends BadRequestException {
  constructor() {
    super('The file content does not match the extension.');
  }
}
