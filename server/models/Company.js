import mongoose from 'mongoose';

/**
 * @description Company Schema for Employers/Recruiters
 */
const companySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Company name is required'],
            unique: true,
            trim: true,
            index: true,
        },
        description: {
            type: String,
            trim: true,
        },
        website: {
            type: String,
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Company location is required'],
            trim: true,
        },
        logo: {
            type: String, // Cloudinary image URL
            default: '',
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true, // Company kis Recruiter dwara banayi gayi hai
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

const Company = mongoose.model('Company', companySchema);
export default Company;
