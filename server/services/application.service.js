import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';

/**
 * @description Job Application Workflow & Lifecycle Business Logic Service Layer
 */
class ApplicationService {
    /**
     * 📝 Candidate Apply Job
     */
    static async applyJob(jobId, userId) {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        if (!job.isActive) {
            throw new ApiError(400, 'This job posting is no longer active!');
        }

        const user = await User.findById(userId);
        if (!user.profile?.resume) {
            throw new ApiError(
                400,
                'Resume missing! Please upload your resume in profile settings before applying for jobs.'
            );
        }

        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (existingApplication) {
            throw new ApiError(400, 'You have already applied for this job posting!');
        }

        const application = await Application.create({
            job: jobId,
            applicant: userId,
        });

        return application;
    }

    /**
     * 📋 Get all jobs applied by logged-in Candidate
     */
    static async getAppliedJobs(userId) {
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name logo location website',
                },
            });

        return applications;
    }

    /**
     * 👥 Get all applicants for a specific Job (Recruiter Only)
     */
    static async getApplicantsForJob(jobId, recruiterUserId) {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        if (job.created_by.toString() !== recruiterUserId.toString()) {
            throw new ApiError(403, 'Unauthorized! You can only view applicants for your own jobs.');
        }

        const applications = await Application.find({ job: jobId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'applicant',
                select: 'name email phoneNumber profile',
            });

        return { jobTitle: job.title, totalApplicants: applications.length, applications };
    }

    /**
     * 🔍 Get Single Application Details by ID
     */
    static async getApplicationById(applicationId, currentUser) {
        const application = await Application.findById(applicationId)
            .populate({
                path: 'job',
                populate: { path: 'company', select: 'name logo' },
            })
            .populate({ path: 'applicant', select: 'name email phoneNumber profile' });

        if (!application) {
            throw new ApiError(404, 'Application not found');
        }

        const isApplicant = application.applicant._id.toString() === currentUser._id.toString();
        const isRecruiterOwner = application.job.created_by.toString() === currentUser._id.toString();
        const isAdmin = currentUser.role === 'admin';

        if (!isApplicant && !isRecruiterOwner && !isAdmin) {
            throw new ApiError(403, 'Unauthorized to view this application details');
        }

        return application;
    }

    /**
     * ⚡ Update Application Status (Recruiter Only)
     */
    static async updateApplicationStatus(applicationId, status, recruiterUserId) {
        const application = await Application.findById(applicationId).populate('job');
        if (!application) {
            throw new ApiError(404, 'Application not found');
        }

        if (application.job.created_by.toString() !== recruiterUserId.toString()) {
            throw new ApiError(403, 'Unauthorized! You can only update applications for your own jobs.');
        }

        application.status = status;
        await application.save();

        return application;
    }

    /**
     * 🛑 Withdraw / Cancel Job Application (Candidate Only)
     */
    static async withdrawApplication(applicationId, userId) {
        const application = await Application.findById(applicationId);
        if (!application) {
            throw new ApiError(404, 'Application not found');
        }

        if (application.applicant.toString() !== userId.toString()) {
            throw new ApiError(403, 'Unauthorized! You can only withdraw your own application.');
        }

        await Application.findByIdAndDelete(applicationId);
        return true;
    }

    /**
     * 🗑️ Delete Application Record (Admin Only)
     */
    static async deleteApplication(applicationId) {
        const application = await Application.findById(applicationId);
        if (!application) {
            throw new ApiError(404, 'Application not found');
        }

        await Application.findByIdAndDelete(applicationId);
        return true;
    }
}

export default ApplicationService;
