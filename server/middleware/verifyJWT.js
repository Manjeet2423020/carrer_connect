import jwt from 'jsonwebtoken';
import ApiError from '../utils/ApiError.js';
import catchAsync from '../utils/catchAsync.js';
import User from '../models/User.js';

/**
 * @description Authentication Middleware to verify JWT Access Token
 * Checks Authorization header or HTTP-Only cookies.
 */
export const verifyJWT = catchAsync(async (req, res, next) => {
    // Token HTTP header (Bearer token) ya Cookie se read karte hain
    const token =
        req.cookies?.accessToken ||
        req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        throw new ApiError(401, 'Unauthorized request! Access token missing.');
    }

    try {
        // Token ko verify aur decode karte hain
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

        // Database se user find karte hain (password field ko exclude karke)
        const user = await User.findById(decoded.id);

        if (!user) {
            throw new ApiError(401, 'Invalid Access Token! User no longer exists.');
        }

        // `req` object par authenticated user ko attach kar dete hain
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, error?.message || 'Invalid or expired access token!');
    }
});
