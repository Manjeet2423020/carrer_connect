/**
 * @description Higher-Order Function to eliminate try-catch blocks in async controllers
 * Automatically passes errors to Express global error handling middleware.
 * 
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware function
 */
const catchAsync = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch((err) => next(err));
    };
};

export default catchAsync;
