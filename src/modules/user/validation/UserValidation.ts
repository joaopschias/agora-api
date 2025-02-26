import { UserRepository } from '@modules/user/repository/UserRepository';
import { Request } from 'express';
import { body, param } from 'express-validator';

/**
 * Validation rules for creating a new user.
 */
export const createUserValidation = [
  body('name').isString().notEmpty().withMessage('Name is required'),

  body('email')
    .isString() // ✅ Ensures the value is a string
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email: string) => {
      const userRepository = new UserRepository();
      const existingUser = await userRepository.findByEmail(email);
      if (existingUser) {
        return Promise.reject(new Error('Email is already in use')); // ✅ Reject with an `Error`
      }
    }),

  body('password')
    .isString()
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];

/**
 * Validation rules for fetching a user by ID.
 */
export const getUserValidation = [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a valid number'),
];

/**
 * Validation rules for updating a user.
 */
export const updateUserValidation = [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a positive integer'),

  body('name').optional().isString().notEmpty().withMessage('Name cannot be empty'),

  body('email')
    .optional()
    .isString()
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email: string, { req }) => {
      const request = req as Request; // ✅ Explicitly cast req to Request

      if (!request.params.id) {
        // ✅ Now TypeScript knows params exists
        return Promise.reject(new Error('Invalid request: Missing user ID'));
      }

      const userRepository = new UserRepository();
      const existingUser = await userRepository.findByEmail(email);

      if (existingUser && existingUser.id !== parseInt(request.params.id, 10)) {
        return Promise.reject(new Error('Email is already in use by another user'));
      }
    }),
];

/**
 * Validation rules for deleting a user by ID.
 */
export const deleteUserValidation = [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
];
