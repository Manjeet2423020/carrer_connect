import AuthService from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';
import { cookieOptions } from '../config/jwt.js';

/**
 * 📝 Register User Controller
 */
export const register = catchAsync(async (req, res) => {
    const result = await AuthService.registerUser(req.body, req.file);

    // Refresh Token ko Secure HTTP-Only Cookie me set karte hain
    res.cookie('refreshToken', result.refreshToken, cookieOptions);

    res
        .status(201)
        .json(new ApiResponse(201, result, 'User registered successfully!'));
});

/**
 * 🔑 Login User Controller
 */
export const login = catchAsync(async (req, res) => {
    const { email, password } = req.body;
    const result = await AuthService.loginUser(email, password);

    res.cookie('refreshToken', result.refreshToken, cookieOptions);

    res
        .status(200)
        .json(new ApiResponse(200, result, 'User logged in successfully!'));
});

/**
 * 🔄 Refresh Token Rotation Controller
 */
export const refreshToken = catchAsync(async (req, res) => {
    const incomingRefreshToken =
        req.cookies?.refreshToken || req.body?.refreshToken;

    const tokens = await AuthService.refreshAccessToken(incomingRefreshToken);

    res.cookie('refreshToken', tokens.refreshToken, cookieOptions);

    res
        .status(200)
        .json(new ApiResponse(200, tokens, 'Access Token refreshed successfully!'));
});

/**
 * 🚪 Logout User Controller
 */
export const logout = catchAsync(async (req, res) => {
    await AuthService.logoutUser(req.user._id);

    // Cookie clear kar dete hain
    res.clearCookie('refreshToken', cookieOptions);

    res
        .status(200)
        .json(new ApiResponse(200, {}, 'User logged out successfully!'));
});
