import { NextFunction, Request, Response } from 'express';

export const notFoundHandler = (_req: Request, res: Response, _next: NextFunction): void => {
  res.status(404).json({
    error: 'Route not found',
    message: 'The requested resource was not found on this server.',
  });
};
