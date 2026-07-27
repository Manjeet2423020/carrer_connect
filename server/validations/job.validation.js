import { body, param } from 'express-validator';

/**
 * 💼 Job Creation Validation Rules
 */
export const createJobValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Job title is required')
        .isLength({ max: 100 })
        .withMessage('Job title cannot exceed 100 characters'),
    body('description')
        .trim()
        .notEmpty()
        .withMessage('Job description is required'),
    body('requirements')
        .isArray({ min: 1 })
        .withMessage('At least one requirement is required'),
    body('salary')
        .notEmpty()
        .withMessage('Salary is required')
        .isNumeric()
        .withMessage('Salary must be a valid number'),
    body('experienceLevel')
        .notEmpty()
        .withMessage('Experience level is required')
        .isIn(['entry', 'mid', 'senior', 'lead'])
        .withMessage('Experience level must be entry, mid, senior, or lead'),
    body('location')
        .trim()
        .notEmpty()
        .withMessage('Location is required'),
    body('jobType')
        .notEmpty()
        .withMessage('Job type is required')
        .isIn(['full-time', 'part-time', 'contract', 'internship', 'remote'])
        .withMessage('Invalid job type selection'),
    body('position')
        .notEmpty()
        .withMessage('Number of positions is required')
        .isInt({ min: 1 })
        .withMessage('Position must be an integer greater than 0'),
    body('companyId')
        .notEmpty()
        .withMessage('Company ID is required')
        .isMongoId()
        .withMessage('Invalid MongoDB Company ID format'),
];

/**
 * 💼 Job Update Validation Rules
 */
export const updateJobValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid Job ID format'),
    body('title')
        .optional()
        .trim()
        .notEmpty()
        .withMessage('Job title cannot be empty'),
    body('salary')
        .optional()
        .isNumeric()
        .withMessage('Salary must be a number'),
    body('jobType')
        .optional()
        .isIn(['full-time', 'part-time', 'contract', 'internship', 'remote'])
        .withMessage('Invalid job type selection'),
];
