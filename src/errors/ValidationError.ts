import { BaseError } from '@errors/BaseError';
import { ERROR_CODE } from '@errors/error-codes';

export class ValidationError extends BaseError {
  constructor(
    message = 'Validation failed',
    statusCode = 400,
    errorCode = ERROR_CODE.VALIDATION_ERROR
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.errorCode = errorCode;
  }
}
