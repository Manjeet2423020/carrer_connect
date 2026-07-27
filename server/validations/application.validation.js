import { body, param, query } from 'express-validator';

/**
 * 📝 Apply Job Mongo ID Validation
 */
export const applyJobValidation = [
    param('id').isMongoId().withMessage('Invalid Job ID format'),
];

/**
 * 📝 Application ID Parameter Validation
 */
export const applicationIdValidation = [
    param('id').isMongoId().withMessage('Invalid MongoDB Application ID format'),
];

/**
 * 📝 Application Status Update Validation
 */
export const updateApplicationStatusValidation = [
    param('id').isMongoId().withMessage('Invalid Application ID format'),
    body('status')
        .notEmpty()
        .withMessage('Application status is required')
        .isIn(['pending', 'accepted', 'rejected', 'interviewing'])
        .withMessage('Status must be pending, accepted, rejected, or interviewing'),
];

/**
 * 📊 Admin Get All Applications Query Validation
 */
export const getAllApplicationsQueryValidation = [
    query('page')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Page number must be a positive integer'),
    query('limit')
        .optional()
        .isInt({ min: 1 })
        .withMessage('Limit must be a positive integer'),
    query('status')
        .optional()
        .isIn(['pending', 'accepted', 'rejected', 'interviewing'])
        .withMessage('Status must be pending, accepted, rejected, or interviewing'),
];
