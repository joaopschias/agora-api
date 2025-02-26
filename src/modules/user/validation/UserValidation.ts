import { UserRepository } from '@modules/user/repository/UserRepository';
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
 * Validation rules for deleting a user by ID.
 */
export const deleteUserValidation = [
  param('id').isInt({ min: 1 }).withMessage('User ID must be a positive integer'),
];
