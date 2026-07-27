import ApiError from '../utils/ApiError.js';

/**
 * @description Authorization Middleware: Restricts access to Recruiters and Admins only
 */
export const isRecruiter = (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, 'Authentication required');
    }

    if (req.user.role !== 'recruiter' && req.user.role !== 'admin') {
        throw new ApiError(
            403,
            'Forbidden! Only recruiters and admins are allowed to perform this action.'
        );
    }

    next();
};
