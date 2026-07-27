import { body, param, query } from 'express-validator';

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
    param('id').isMongoId().withMessage('Invalid Company ID format'),
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

/**
 * 🔍 Company ID Parameter Validation
 */
export const companyIdValidation = [
    param('id').isMongoId().withMessage('Invalid MongoDB Company ID format'),
];

/**
 * 📊 Public Search & Pagination Query Validation
 */
export const getAllCompaniesQueryValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page number must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),
];
