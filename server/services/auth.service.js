import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { generateAccessToken, generateRefreshToken } from '../utils/generateToken.js';
import EmailService from './email.service.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';
import jwt from 'jsonwebtoken';

/**
 * @description Authentication & User Management Service Layer
 */
class AuthService {
    /**
     * 📝 Register a new user
     */
    static async registerUser(userData, file) {
        const { name, email, password, role, phoneNumber } = userData;

        // Check if email already exists in database
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            // Temporary file uploaded by multer clean up karte hain agar registration fail hota hai
            if (file) fs.unlinkSync(file.path);
            throw new ApiError(400, 'User with this email already exists!');
        }

        let profilePhotoUrl = '';
        if (file) {
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'career_connect/profiles',
            });
            profilePhotoUrl = uploadResult.secure_url;
            fs.unlinkSync(file.path); // Remove local file after upload to Cloudinary
        }

        // Generate 6-digit OTP for email verification
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = new Date(Date.now() + 10 * 60 * 1000); // Valid for 10 minutes

        // Create user in DB (Password automatic hash ho jayega pre-save hook se)
        const user = await User.create({
            name,
            email,
            password,
            role: role || 'jobseeker',
            phoneNumber,
            profile: {
                profilePhoto: profilePhotoUrl,
            },
            otp,
            otpExpiry,
        });

        // Send emails in background
        EmailService.sendWelcomeEmail(user.email, user.name);
        EmailService.sendOTPEmail(user.email, otp);

        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);

        // Save Refresh Token in DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        // Exclude sensitive fields before returning
        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.refreshToken;
        delete userResponse.otp;

        return { user: userResponse, accessToken, refreshToken };
    }

    /**
     * 🔑 Login User
     */
    static async loginUser(email, password) {
        // Explicitly include password field using select('+password')
        const user = await User.findOne({ email }).select('+password +refreshToken');
        if (!user) {
            throw new ApiError(401, 'Invalid email or password credentials!');
        }

        // Compare entered password with hashed password in DB
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            throw new ApiError(401, 'Invalid email or password credentials!');
        }

        const accessToken = generateAccessToken(user._id, user.role);
        const refreshToken = generateRefreshToken(user._id);

        // Store Refresh Token in DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        const userResponse = user.toObject();
        delete userResponse.password;
        delete userResponse.refreshToken;

        return { user: userResponse, accessToken, refreshToken };
    }

    /**
     * 🔄 Refresh Token Rotation (Generate New Access & Refresh Tokens)
     */
    static async refreshAccessToken(incomingRefreshToken) {
        if (!incomingRefreshToken) {
            throw new ApiError(401, 'Refresh Token is required');
        }

        try {
            const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await User.findById(decoded.id).select('+refreshToken');

            if (!user || user.refreshToken !== incomingRefreshToken) {
                throw new ApiError(401, 'Invalid or expired Refresh Token');
            }

            // Generate NEW Tokens (Refresh Token Rotation for high security)
            const newAccessToken = generateAccessToken(user._id, user.role);
            const newRefreshToken = generateRefreshToken(user._id);

            user.refreshToken = newRefreshToken;
            await user.save({ validateBeforeSave: false });

            return { accessToken: newAccessToken, refreshToken: newRefreshToken };
        } catch (error) {
            throw new ApiError(401, 'Invalid or expired Refresh Token');
        }
    }

    /**
     * 🚪 Logout User
     */
    static async logoutUser(userId) {
        // Clear Refresh Token in DB
        await User.findByIdAndUpdate(userId, { $unset: { refreshToken: 1 } }, { new: true });
        return true;
    }

    /**
     * 📄 Upload Resume PDF to Cloudinary
     */
    static async updateUserResume(userId, file) {
        if (!file) {
            throw new ApiError(400, 'Resume file is required');
        }

        const user = await User.findById(userId);
        if (!user) {
            if (file) fs.unlinkSync(file.path);
            throw new ApiError(404, 'User not found');
        }

        // Upload PDF to Cloudinary as raw resource
        const uploadResult = await cloudinary.uploader.upload(file.path, {
            folder: 'career_connect/resumes',
            resource_type: 'raw',
        });

        fs.unlinkSync(file.path); // Delete local temp file

        user.profile.resume = uploadResult.secure_url;
        user.profile.resumeOriginalName = file.originalname;
        await user.save();

        return user;
    }

    /**
     * ✏️ Update User Profile (Bio, Skills, Phone, Name)
     */
    static async updateUserProfile(userId, updateData) {
        const { name, phoneNumber, bio, skills } = updateData;

        const user = await User.findById(userId);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        if (name) user.name = name;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio !== undefined) user.profile.bio = bio;
        if (skills) {
            // Skills strings can be passed as comma-separated or array
            user.profile.skills = Array.isArray(skills)
                ? skills
                : skills.split(',').map((s) => s.trim());
        }

        await user.save();
        return user;
    }
}

export default AuthService;
