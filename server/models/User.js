import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

/**
 * @description User Schema for Authentication, Roles, & Profile details
 */
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            trim: true,
            maxlength: [50, 'Name cannot exceed 50 characters'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            lowercase: true,
            trim: true,
            index: true, // Fast lookup indexing
            match: [
                /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                'Please enter a valid email address',
            ],
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minlength: [6, 'Password must be at least 6 characters'],
            select: false, // Security: Queries me default password return nahi karega
        },
        role: {
            type: String,
            enum: {
                values: ['jobseeker', 'recruiter', 'admin'],
                message: 'Role must be either jobseeker, recruiter, or admin',
            },
            default: 'jobseeker',
            index: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
        },
        profile: {
            bio: { type: String, default: '' },
            skills: [{ type: String, trim: true }],
            resume: { type: String, default: '' }, // Cloudinary URL
            resumeOriginalName: { type: String, default: '' },
            company: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Company',
            },
            profilePhoto: {
                type: String,
                default: '',
            },
        },
        savedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Job',
            },
        ],
        refreshToken: {
            type: String,
            select: false,
        },
        isEmailVerified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: String,
            select: false,
        },
        otpExpiry: {
            type: Date,
            select: false,
        },
    },
    {
        timestamps: true, // Automatic createdAt and updatedAt timestamps
    }
);

/**
 * 🔒 Pre-save Middleware: Automatic Password Hashing
 * Runs before user document is saved to database.
 */
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/**
 * 🔑 Instance Method: Compare input password with hashed password in database
 */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);
export default User;
