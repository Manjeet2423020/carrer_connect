import { body, param } from 'express-validator';

/**
 * 📝 Apply Job Mongo ID Validation
 */
export const applyJobValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid Job ID format'),
];

/**
 * 📝 Application Status Update Validation
 */
export const updateApplicationStatusValidation = [
    param('id')
        .isMongoId()
        .withMessage('Invalid Application ID format'),
    body('status')
        .notEmpty()
        .withMessage('Application status is required')
        .isIn(['pending', 'accepted', 'rejected', 'interviewing'])
        .withMessage('Status must be pending, accepted, rejected, or interviewing'),
];
