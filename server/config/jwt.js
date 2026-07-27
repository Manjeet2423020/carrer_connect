/**
 * @description Cookie & Security Configurations for Tokens
 */
export const cookieOptions = {
    httpOnly: true, // Prevents XSS attacks (JavaScript client cookie read nahi kar sakta)
    secure: process.env.NODE_ENV === 'production', // HTTPS in production
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // CSRF protection
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 Days in milliseconds
};
