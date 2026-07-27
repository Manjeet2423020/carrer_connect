import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import bcrypt from 'bcryptjs';

/**
 * @description User Management & Administration Business Logic Service Layer
 */
class UserService {
    /**
     * 🔍 Get User Profile by Mongo ObjectId
     */
    static async getUserById(userId) {
        const user = await User.findById(userId)
            .populate('profile.company', 'name logo website location')
            .populate('savedJobs', 'title location salary jobType');

        if (!user) {
            throw new ApiError(404, 'User not found');
        }
        return user;
    }

    /**
     * 🔒 Change / Update User Password
     */
    static async updatePassword(userId, oldPassword, newPassword) {
        // Select password field explicitly
        const user = await User.findById(userId).select('+password');
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // Verify old password
        const isPasswordCorrect = await user.comparePassword(oldPassword);
        if (!isPasswordCorrect) {
            throw new ApiError(400, 'Current password entered is incorrect!');
        }

        user.password = newPassword;
        await user.save(); // Triggers pre-save password hashing hook

        return true;
    }

    /**
     * 📊 Get All Users with Search, Role Filtering & Pagination (Admin Only)
     */
    static async getAllUsers(queryParams) {
        const { keyword, role, sort, page = 1, limit = 10 } = queryParams;

        const filterQuery = {};

        // Keyword Search on Name or Email
        if (keyword) {
            filterQuery.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { email: { $regex: keyword, $options: 'i' } },
            ];
        }

        // Role Filter (jobseeker, recruiter, admin)
        if (role) {
            filterQuery.role = role;
        }

        // Sorting Options
        let sortOptions = { createdAt: -1 }; // Default: Newest first
        if (sort === 'oldest') sortOptions = { createdAt: 1 };
        if (sort === 'name-asc') sortOptions = { name: 1 };

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, parseInt(limit));
        const skip = (pageNum - 1) * limitNum;

        // Execute Lean Query for maximum speed
        const users = await User.find(filterQuery)
            .select('-refreshToken')
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum)
            .lean();

        const totalUsers = await User.countDocuments(filterQuery);
        const totalPages = Math.ceil(totalUsers / limitNum);

        return {
            users,
            pagination: {
                totalUsers,
                totalPages,
                currentPage: pageNum,
                limit: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1,
            },
        };
    }

    /**
     * 🗑️ Delete User Account (Admin Only)
     */
    static async deleteUser(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        await User.findByIdAndDelete(userId);
        return true;
    }
}

export default UserService;
