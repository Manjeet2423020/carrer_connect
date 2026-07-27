import { body, validationResult } from 'express-validator';
import ApiError from '../utils/ApiError.js';

/**
 * 🛠️ Validation Runner Middleware: Validates incoming request against rules
 */
export const validate = (validations) => {
    return async (req, res, next) => {
        // Har validation rule execute karte hain
        await Promise.all(validations.map((validation) => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        const extractedErrors = errors.array().map((err) => ({
            field: err.path,
            message: err.msg,
        }));

        // Agar validation error aati hai, Controller run nahi hoga! Straight 400 Bad Request
        return next(new ApiError(400, 'Validation Failed!', extractedErrors));
    };
};

/**
 * 📝 User Registration Validation Rules
 */
export const registerValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required')
        .isLength({ max: 50 })
        .withMessage('Name cannot exceed 50 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('role')
        .optional()
        .isIn(['jobseeker', 'recruiter', 'admin'])
        .withMessage('Role must be either jobseeker, recruiter, or admin'),
];

/**
 * 🔑 User Login Validation Rules
 */
export const loginValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
    body('password').notEmpty().withMessage('Password is required'),
];

/**
 * 🔒 Forgot & Reset Password Validations
 */
export const forgotPasswordValidation = [
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Please enter a valid email address'),
];

export const resetPasswordValidation = [
    body('token').notEmpty().withMessage('Reset token is required'),
    body('newPassword')
        .notEmpty()
        .withMessage('New password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
];
