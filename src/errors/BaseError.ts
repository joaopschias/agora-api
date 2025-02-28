import { ERROR_CODE } from './error-codes';

export class BaseError extends Error {
  name: string;
  statusCode: number;
  errorCode: number;

  constructor(message = 'Generic error', statusCode = 500, errorCode = ERROR_CODE.GENERIC_ERROR) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
