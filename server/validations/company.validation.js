import { body } from 'express-validator';

/**
 * 🏢 Company Creation Validation Rules
 */
export const createCompanyValidation = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Company name is required')
        .isLength({ max: 100 })
        .withMessage('Company name cannot exceed 100 characters'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 1000 })
        .withMessage('Description cannot exceed 1000 characters'),
    body('website')
        .optional()
        .trim()
        .isURL()
        .withMessage('Please enter a valid URL (e.g. https://company.com)'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Company location is required'),
];

/**
 * 🏢 Company Update Validation Rules
 */
export const updateCompanyValidation = [
    body('name')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Company name cannot be empty')
        .isLength({ max: 100 })
        .withMessage('Company name cannot exceed 100 characters'),
    body('website')
        .optional()
        .trim()
        .isURL()
        .withMessage('Please enter a valid URL'),
];
