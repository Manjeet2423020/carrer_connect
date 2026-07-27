import Application from '../models/Application.js';
import Job from '../models/Job.js';
import User from '../models/User.js';
import Company from '../models/Company.js';
import ApiError from '../utils/ApiError.js';

/**
 * @description Job Application Workflow & Analytics Service Layer
 */
class ApplicationService {
    /**
     * 📝 Candidate Job Application
     */
    static async applyJob(jobId, userId) {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        if (!job.isActive) {
            throw new ApiError(400, 'This job posting is no longer active!');
        }

        // Check if candidate has uploaded a resume
        const user = await User.findById(userId);
        if (!user.profile?.resume) {
            throw new ApiError(
                400,
                'Resume missing! Please upload your resume in profile settings before applying for jobs.'
            );
        }

        // Check if user already applied to this job
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: userId,
        });

        if (existingApplication) {
            throw new ApiError(400, 'You have already applied for this job posting!');
        }

        // Create Application
        const application = await Application.create({
            job: jobId,
            applicant: userId,
        });

        return application;
    }

    /**
     * 📋 Get all jobs applied by logged-in JobSeeker
     */
    static async getAppliedJobs(userId) {
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                populate: {
                    path: 'company',
                    select: 'name logo location',
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

        // Authorization: Verify recruiter owns this job
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
     * ⚡ Update Application Status (Pending, Accepted, Rejected, Interviewing)
     */
    static async updateApplicationStatus(applicationId, status, recruiterUserId) {
        const application = await Application.findById(applicationId).populate('job');
        if (!application) {
            throw new ApiError(404, 'Application not found');
        }

        // Authorization check
        if (application.job.created_by.toString() !== recruiterUserId.toString()) {
            throw new ApiError(403, 'Unauthorized! You can only update applications for your own jobs.');
        }

        application.status = status;
        await application.save();

        return application;
    }

    /**
     * 📊 Recruiter Analytics Dashboard Metrics
     */
    static async getRecruiterDashboard(recruiterUserId) {
        const totalJobs = await Job.countDocuments({ created_by: recruiterUserId });
        const recruiterJobs = await Job.find({ created_by: recruiterUserId }).select('_id');
        const jobIds = recruiterJobs.map((j) => j._id);

        const totalApplications = await Application.countDocuments({ job: { $in: jobIds } });
        const pendingApplications = await Application.countDocuments({
            job: { $in: jobIds },
            status: 'pending',
        });
        const acceptedApplications = await Application.countDocuments({
            job: { $in: jobIds },
            status: 'accepted',
        });
        const rejectedApplications = await Application.countDocuments({
            job: { $in: jobIds },
            status: 'rejected',
        });

        return {
            totalJobs,
            totalApplications,
            statusBreakdown: {
                pending: pendingApplications,
                accepted: acceptedApplications,
                rejected: rejectedApplications,
            },
        };
    }

    /**
     * 👑 Admin Master Dashboard Metrics
     */
    static async getAdminDashboard() {
        const totalUsers = await User.countDocuments();
        const jobseekersCount = await User.countDocuments({ role: 'jobseeker' });
        const recruitersCount = await User.countDocuments({ role: 'recruiter' });
        const totalCompanies = await Company.countDocuments();
        const totalJobs = await Job.countDocuments();
        const totalApplications = await Application.countDocuments();

        return {
            users: {
                total: totalUsers,
                jobseekers: jobseekersCount,
                recruiters: recruitersCount,
            },
            totalCompanies,
            totalJobs,
            totalApplications,
        };
    }
}

export default ApplicationService;
