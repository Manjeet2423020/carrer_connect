import ApiError from '../utils/ApiError.js';

/**
 * @description Authorization Middleware: Restricts access exclusively to System Admin
 */
export const isAdmin = (req, res, next) => {
    if (!req.user) {
        throw new ApiError(401, 'Authentication required');
    }

    if (req.user.role !== 'admin') {
        throw new ApiError(
            403,
            'Forbidden! Access denied. Admin privileges required.'
        );
    }

    next();
};
