import ILogger from '@interfaces/logger';
import { NextFunction, Request, Response } from 'express';
import { pick } from 'lodash';

interface CustomResponse<T = unknown> extends Response {
  contentBody?: T;
}

export const loggerMiddleware =
  <T>(logger: ILogger) =>
  (req: Request, res: CustomResponse<T>, next: NextFunction): void => {
    try {
      logger.info('Incoming request', {
        url: `${req.method} ${req.originalUrl}`,
        ...pick(req, ['body', 'query']),
        requestHeaders: req.headers,
      });

      const originalSend = res.send;
      res.contentBody = undefined;

      res.send = <U extends T | undefined>(content: U): Response<U> => {
        res.contentBody = content as T;
        res.send = originalSend;
        return res.send(content);
      };

      res.on('finish', () => {
        let parsedContentBody: unknown = res.contentBody;

        if (typeof res.contentBody === 'string') {
          try {
            parsedContentBody = JSON.parse(res.contentBody);
          } catch {
            logger.error('loggerMiddleware', { message: 'Error parsing content body' });
          }
        }

        const logData = {
          status: res.statusCode,
          body: parsedContentBody ?? res.contentBody,
        };

        if (res.statusCode >= 400) {
          logger.error('Response', logData);
        } else {
          logger.info('Response', logData);
        }
      });

      return next();
    } catch (err) {
      logger.error('loggerMiddleware', { error: err });
      return next();
    }
  };
