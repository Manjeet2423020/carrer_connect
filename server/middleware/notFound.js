import ApiError from '../utils/ApiError.js';

/**
 * @description 404 Not Found Middleware for unhandled route endpoints
 */
const notFound = (req, res, next) => {
    const error = new ApiError(
        404,
        `Route Not Found - ${req.originalUrl} does not exist on this server!`
    );
    next(error);
};

export default notFound;
