export interface IExceptionResponse {
  statusCode: number;
  message: string;
}

export interface IHttpExceptionResponse extends IExceptionResponse {
  path: string;
  method: string;
  timeStamp: Date;
  stackTrace: string;
}
