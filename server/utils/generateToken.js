import jwt from 'jsonwebtoken';

/**
 * @description Generates a short-lived JWT Access Token
 * @param {string} userId - User's MongoDB ObjectId
 * @param {string} role - User's role (admin, recruiter, jobseeker)
 * @returns {string} JWT Access Token
 */
export const generateAccessToken = (userId, role) => {
    return jwt.sign(
        { id: userId, role: role },
        process.env.JWT_ACCESS_SECRET,
        { expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m' }
    );
};

/**
 * @description Generates a long-lived JWT Refresh Token
 * @param {string} userId - User's MongoDB ObjectId
 * @returns {string} JWT Refresh Token
 */
export const generateRefreshToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_REFRESH_SECRET,
        { expiresIn: process.env.JWT_REFRESH_EXPIRY || '7d' }
    );
};
