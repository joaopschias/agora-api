import { param } from 'express-validator';

/**
 * Validation rules for fetching a user by ID.
 */
export const getUserValidation = [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a valid number'),
];

/**
 * Validation rules for deleting a user by ID.
 */
export const deleteUserValidation = [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
];
