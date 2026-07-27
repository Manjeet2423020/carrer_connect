import { body, param, query } from 'express-validator';

/**
 * 🔒 Change Password Validation Rules
 */
export const updatePasswordValidation = [
    body('oldPassword')
        .notEmpty()
        .withMessage('Current (old) password is required'),
    body('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('New password must be at least 6 characters long'),
];

/**
 * 🔍 User ID Parameter Validation
 */
export const userIdValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid MongoDB User ID format'),
];

/**
 * 📊 Admin Get All Users Query Validation
 */
export const getAllUsersQueryValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page number must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),
    query('role')
        .optional()
        .isIn(['jobseeker', 'recruiter', 'admin'])
        .withMessage('Role must be jobseeker, recruiter, or admin'),
];
