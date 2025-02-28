import { BaseError } from '@errors/BaseError';
import { ERROR_CODE } from '@errors/error-codes';
import ILogger from '@interfaces/ILogger';
import type { NextFunction, Request, Response } from 'express';

export const errorHandler =
  (logger: ILogger) =>
  (err: Error | BaseError, req: Request, res: Response, _next: NextFunction): void => {
    const { statusCode, errorCode } =
      err instanceof BaseError
        ? { statusCode: err.statusCode, errorCode: err.errorCode }
        : { statusCode: 500, errorCode: ERROR_CODE.GENERIC_ERROR };

    res.status(statusCode);

    const errorDetails = {
      name: err.name,
      message: err.message,
      stack: process.env.NODE_ENV !== 'production' ? err.stack : undefined, // Hide stack trace in production
    };

    logger.error(`Error ${statusCode}: ${errorDetails.name}, Code: ${errorCode}`, { errorDetails });

    res.json({
      title: err.name,
      status: statusCode,
      details: err.message,
      type: errorCode,
    });
  };
