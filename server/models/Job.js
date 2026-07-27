import mongoose from 'mongoose';

/**
 * @description Job Posting Schema for Recruiters & Search Indexing
 */
const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Job title is required'],
            trim: true,
        },
        description: {
            type: String,
            required: [true, 'Job description is required'],
        },
        requirements: [
            {
                type: String,
                trim: true,
            },
        ],
        salary: {
            type: Number,
            required: [true, 'Salary is required'],
        },
        experienceLevel: {
            type: String,
            enum: ['entry', 'mid', 'senior', 'lead'],
            required: [true, 'Experience level is required'],
            index: true,
        },
        location: {
            type: String,
            required: [true, 'Location is required'],
            trim: true,
        },
        jobType: {
            type: String,
            enum: ['full-time', 'part-time', 'contract', 'internship', 'remote'],
            required: [true, 'Job type is required'],
            index: true,
        },
        position: {
            type: Number,
            required: [true, 'Number of positions is required'],
            min: [1, 'Position must be at least 1'],
        },
        company: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company',
            required: true,
            index: true,
        },
        created_by: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            index: true,
        },
        isActive: {
            type: Boolean,
            default: true,
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// 🔍 Text Indexing for Super Fast Search Queries (Job Title & Description par search ke liye)
jobSchema.index({ title: 'text', description: 'text' });

const Job = mongoose.model('Job', jobSchema);
export default Job;
