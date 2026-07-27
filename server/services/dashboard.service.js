import Job from '../models/Job.js';
import Application from '../models/Application.js';
import User from '../models/User.js';
import Company from '../models/Company.js';

/**
 * @description Recruiter & Admin Analytics Dashboard Business Logic Service Layer
 */
class DashboardService {
    /**
     * 📊 Recruiter Analytics Dashboard Metrics
     */
    static async getRecruiterDashboard(recruiterUserId) {
        // Recruiter dwara post ki gayi saari jobs ki IDs nikalte hain
        const recruiterJobs = await Job.find({ created_by: recruiterUserId }).select('_id');
        const jobIds = recruiterJobs.map((j) => j._id);

        const totalJobs = recruiterJobs.length;
        const totalApplications = await Application.countDocuments({ job: { $in: jobIds } });

        const pendingCount = await Application.countDocuments({ job: { $in: jobIds }, status: 'pending' });
        const interviewingCount = await Application.countDocuments({ job: { $in: jobIds }, status: 'interviewing' });
        const acceptedCount = await Application.countDocuments({ job: { $in: jobIds }, status: 'accepted' });
        const rejectedCount = await Application.countDocuments({ job: { $in: jobIds }, status: 'rejected' });

        // Recent 5 Applications received for recruiter's jobs
        const recentApplications = await Application.find({ job: { $in: jobIds } })
            .sort({ createdAt: -1 })
            .limit(5)
            .populate({ path: 'applicant', select: 'name email profile.profilePhoto' })
            .populate({ path: 'job', select: 'title' })
            .lean();

        return {
            metrics: {
                totalJobs,
                totalApplications,
                statusBreakdown: {
                    pending: pendingCount,
                    interviewing: interviewingCount,
                    accepted: acceptedCount,
                    rejected: rejectedCount,
                },
            },
            recentApplications,
        };
    }

    /**
     * 👑 Master Admin Dashboard Metrics
     */
    static async getAdminDashboard() {
        const totalUsers = await User.countDocuments();
        const jobseekersCount = await User.countDocuments({ role: 'jobseeker' });
        const recruitersCount = await User.countDocuments({ role: 'recruiter' });
        const adminsCount = await User.countDocuments({ role: 'admin' });

        const totalCompanies = await Company.countDocuments();
        const totalJobs = await Job.countDocuments();
        const activeJobs = await Job.countDocuments({ isActive: true });
        const totalApplications = await Application.countDocuments();

        // Recent 5 registered users
        const recentUsers = await User.find()
            .select('name email role createdAt')
            .sort({ createdAt: -1 })
            .limit(5)
            .lean();

        return {
            users: {
                total: totalUsers,
                jobseekers: jobseekersCount,
                recruiters: recruitersCount,
                admins: adminsCount,
            },
            content: {
                totalCompanies,
                totalJobs,
                activeJobs,
                totalApplications,
            },
            recentUsers,
        };
    }
}

export default DashboardService;
