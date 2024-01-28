import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateDatabaseKey extends HttpException {
  constructor(message: string) {
    super(
      DuplicateDatabaseKey.handleDuplicateKeyError(message),
      HttpStatus.BAD_REQUEST,
    );
  }

  static handleDuplicateKeyError = (rawMessage: string) => {
    const pathRegex = /index: (\w+)_/;
    const match = rawMessage.match(pathRegex);
    const path = match ? match[1] : null;
    const message = `${path} is already in use. Use another one.`;
    return message;
  };
}
