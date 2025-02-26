import { NextFunction, Request, Response } from 'express';
import { ValidationError, validationResult } from 'express-validator';

/**
 * Middleware to handle validation errors from express-validator.
 *
 * @param req - Express request object.
 * @param res - Express response object.
 * @param next - Express next function.
 */
export const validateRequest = (req: Request, res: Response, next: NextFunction): void => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const details: string[] = errors.array().map((err: ValidationError) => err.msg as string);
    res.status(400).json({
      title: 'Validation Error',
      status: 400,
      details,
    });
    return;
  }

  next();
};
