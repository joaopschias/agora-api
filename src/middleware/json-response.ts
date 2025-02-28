import { NextFunction, Request, Response } from 'express';

export const enforceJsonResponse = (_req: Request, res: Response, next: NextFunction): void => {
  res.setHeader('Content-Type', 'application/json');
  next();
};
