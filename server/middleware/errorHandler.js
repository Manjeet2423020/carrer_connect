import ApiError from '../utils/ApiError.js';

/**
 * @description Global Express Error Handling Middleware
 * Intercepts all errors thrown across the app and transforms them into standardized API Error Responses.
 */
const errorHandler = (err, req, res, next) => {
    let error = err;

    // Agar error `ApiError` class ka instance nahi hai (jaise Database or Mongoose error)
    if (!(error instanceof ApiError)) {
        const statusCode = error.statusCode || (error.name === 'ValidationError' ? 400 : 500);
        const message = error.message || 'Internal Server Error';
        error = new ApiError(statusCode, message, error?.errors || [], err.stack);
    }

    // 1. Handle Mongoose Invalid ObjectId Error (CastError)
    if (err.name === 'CastError') {
        const message = `Resource not found. Invalid ID format: ${err.value}`;
        error = new ApiError(400, message);
    }

    // 2. Handle Mongoose Duplicate Key Error (E11000 - e.g., Duplicate Email)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const message = `Duplicate value entered for ${field} field. Please use another value!`;
        error = new ApiError(400, message);
    }

    // 3. Handle Mongoose Schema Validation Error
    if (err.name === 'ValidationError') {
        const message = Object.values(err.errors).map((val) => val.message).join(', ');
        error = new ApiError(400, message);
    }

    // 4. Handle JWT Token Expired Error
    if (err.name === 'TokenExpiredError') {
        error = new ApiError(401, 'JSON Web Token has expired! Please login again.');
    }

    // 5. Handle JsonWebTokenError (Tampered or Malformed token)
    if (err.name === 'JsonWebTokenError') {
        error = new ApiError(401, 'Invalid JSON Web Token! Access denied.');
    }

    // Standardized Production Response Format
    const response = {
        success: false,
        statusCode: error.statusCode,
        message: error.message,
        ...(error.errors.length > 0 && { errors: error.errors }),
        ...(process.env.NODE_ENV === 'development' && { stack: error.stack }), // Stack trace only in Dev mode
    };

    res.status(error.statusCode).json(response);
};

export default errorHandler;
