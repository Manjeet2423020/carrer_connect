import AuthService from '../services/auth.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

/**
 * 👤 Get Logged-in User Profile Controller
 */
export const getProfile = catchAsync(async (req, res) => {
    res
        .status(200)
        .json(new ApiResponse(200, req.user, 'User profile retrieved successfully!'));
});

/**
 * ✏️ Update Profile Details Controller
 */
export const updateProfile = catchAsync(async (req, res) => {
    const updatedUser = await AuthService.updateUserProfile(req.user._id, req.body);

    res
        .status(200)
        .json(new ApiResponse(200, updatedUser, 'Profile updated successfully!'));
});

/**
 * 📄 Upload Resume PDF Controller
 */
export const uploadResume = catchAsync(async (req, res) => {
    const updatedUser = await AuthService.updateUserResume(req.user._id, req.file);

    res
        .status(200)
        .json(new ApiResponse(200, updatedUser, 'Resume uploaded successfully!'));
});
