import mongoose from 'mongoose';

/**
 * @description Job Application Schema tracking applicants & status workflow
 */
const applicationSchema = new mongoose.Schema(
    {
        job: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Job',
            required: true,
            index: true,
        },
        applicant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true,
        },
        status: {
            type: String,
            enum: {
                values: ['pending', 'accepted', 'rejected', 'interviewing'],
                message: 'Status must be pending, accepted, rejected, or interviewing',
            },
            default: 'pending',
            index: true,
        },
    },
    {
        timestamps: true,
    }
);

// 🚫 Compound Index: Ek user ek hi job par 2 baar apply na kar sake!
applicationSchema.index({ job: 1, applicant: 1 }, { unique: true });

const Application = mongoose.model('Application', applicationSchema);
export default Application;
