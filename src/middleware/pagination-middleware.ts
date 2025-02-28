import { NextFunction, Request, Response } from 'express';
import { query, validationResult } from 'express-validator';

/**
 * Middleware to validate pagination parameters.
 */
export const validatePagination = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer.')
    .toInt(),
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100.')
    .toInt(),
  (req: Request, res: Response, next: NextFunction): void => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }

    req.query.page = req.query.page ?? '1';
    req.query.limit = req.query.limit ?? '10';

    next();
  },
];
