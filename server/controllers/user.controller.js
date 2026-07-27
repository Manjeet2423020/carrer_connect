import AuthService from '../services/auth.service.js';
import UserService from '../services/user.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const getProfile = catchAsync(async (req, res) => {
    const user = await UserService.getUserById(req.user._id);
    res.status(200).json(new ApiResponse(200, user, 'User profile fetched successfully!'));
});

export const getUserById = catchAsync(async (req, res) => {
    const user = await UserService.getUserById(req.params.id);
    res.status(200).json(new ApiResponse(200, user, 'User details fetched successfully!'));
});

export const updateProfile = catchAsync(async (req, res) => {
    const updatedUser = await AuthService.updateUserProfile(req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated successfully!'));
});

export const updatePassword = catchAsync(async (req, res) => {
    const { oldPassword, newPassword } = req.body;
    await UserService.updatePassword(req.user._id, oldPassword, newPassword);
    res.status(200).json(new ApiResponse(200, {}, 'Password changed successfully!'));
});

export const uploadResume = catchAsync(async (req, res) => {
    const updatedUser = await AuthService.updateUserResume(req.user._id, req.file);
    res.status(200).json(new ApiResponse(200, updatedUser, 'Resume uploaded successfully!'));
});

export const getAllUsers = catchAsync(async (req, res) => {
    const result = await UserService.getAllUsers(req.query);
    res.status(200).json(new ApiResponse(200, result, 'Users list fetched successfully!'));
});

export const deleteUser = catchAsync(async (req, res) => {
    await UserService.deleteUser(req.params.id);
    res.status(200).json(new ApiResponse(200, {}, 'User account deleted successfully!'));
});
