import Job from '../models/Job.js';
import Company from '../models/Company.js';
import User from '../models/User.js';
import Application from '../models/Application.js';
import ApiError from '../utils/ApiError.js';
import { generateSlug } from '../utils/generateSlug.js';

/**
 * @description Job Management & Search Engine Business Logic Service Layer
 */
class JobService {
    /**
     * 💼 Post / Create a New Job
     */
    static async createJob(jobData, userId) {
        const { title, description, requirements, salary, experienceLevel, location, jobType, position, companyId } = jobData;

        const company = await Company.findById(companyId);
        if (!company) {
            throw new ApiError(404, 'Company not found');
        }

        if (company.userId.toString() !== userId.toString()) {
            throw new ApiError(403, 'Unauthorized! You can only post jobs for your own company.');
        }

        const slug = generateSlug(title);

        const job = await Job.create({
            title,
            description,
            requirements: Array.isArray(requirements) ? requirements : requirements.split(',').map((r) => r.trim()),
            salary: Number(salary),
            experienceLevel,
            location,
            jobType,
            position: Number(position),
            company: companyId,
            created_by: userId,
            slug,
        });

        return job;
    }

    /**
     * 🔍 Multi-Filter, Full-Text Search, Sorting & Pagination Engine
     */
    static async getAllJobs(query) {
        const {
            keyword,
            location,
            jobType,
            experienceLevel,
            minSalary,
            maxSalary,
            sort,
            page = 1,
            limit = 10,
        } = query;

        const filterQuery = { isActive: true };

        if (keyword) {
            filterQuery.$or = [
                { title: { $regex: keyword, $options: 'i' } },
                { description: { $regex: keyword, $options: 'i' } },
            ];
        }

        if (location) {
            filterQuery.location = { $regex: location, $options: 'i' };
        }

        if (jobType) {
            filterQuery.jobType = jobType;
        }

        if (experienceLevel) {
            filterQuery.experienceLevel = experienceLevel;
        }

        if (minSalary || maxSalary) {
            filterQuery.salary = {};
            if (minSalary) filterQuery.salary.$gte = Number(minSalary);
            if (maxSalary) filterQuery.salary.$lte = Number(maxSalary);
        }

        let sortOptions = { createdAt: -1 };
        if (sort === 'oldest') sortOptions = { createdAt: 1 };
        if (sort === 'salary-high') sortOptions = { salary: -1 };
        if (sort === 'salary-low') sortOptions = { salary: 1 };

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, parseInt(limit));
        const skip = (pageNum - 1) * limitNum;

        const jobs = await Job.find(filterQuery)
            .populate({ path: 'company', select: 'name logo location website slug' })
            .populate({ path: 'created_by', select: 'name email' })
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum)
            .lean();

        const totalJobs = await Job.countDocuments(filterQuery);
        const totalPages = Math.ceil(totalJobs / limitNum);

        return {
            jobs,
            pagination: {
                totalJobs,
                totalPages,
                currentPage: pageNum,
                limit: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1,
            },
        };
    }

    /**
     * 🔍 Get Job Details by ID
     */
    static async getJobById(jobId) {
        const job = await Job.findById(jobId)
            .populate({ path: 'company', select: 'name logo description website location' })
            .populate({ path: 'created_by', select: 'name email' });

        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        return job;
    }

    /**
     * 📋 Get all jobs posted by a Recruiter
     */
    static async getRecruiterJobs(userId) {
        const jobs = await Job.find({ created_by: userId })
            .populate({ path: 'company', select: 'name logo' })
            .sort({ createdAt: -1 });

        return jobs;
    }

    /**
     * ✏️ Update Job Posting
     */
    static async updateJob(jobId, userId, updateData) {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        if (job.created_by.toString() !== userId.toString()) {
            throw new ApiError(403, 'Unauthorized! You can only edit jobs created by you.');
        }

        if (updateData.title) {
            job.title = updateData.title;
            job.slug = generateSlug(updateData.title);
        }
        if (updateData.description) job.description = updateData.description;
        if (updateData.requirements) {
            job.requirements = Array.isArray(updateData.requirements)
                ? updateData.requirements
                : updateData.requirements.split(',').map((r) => r.trim());
        }
        if (updateData.salary) job.salary = Number(updateData.salary);
        if (updateData.location) job.location = updateData.location;
        if (updateData.jobType) job.jobType = updateData.jobType;
        if (updateData.experienceLevel) job.experienceLevel = updateData.experienceLevel;
        if (updateData.position) job.position = Number(updateData.position);
        if (updateData.isActive !== undefined) job.isActive = updateData.isActive;

        await job.save();
        return job;
    }

    /**
     * 🗑️ Delete Job Posting (Owner or Admin)
     */
    static async deleteJob(jobId, currentUser) {
        const job = await Job.findById(jobId);
        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        const isOwner = job.created_by.toString() === currentUser._id.toString();
        const isAdmin = currentUser.role === 'admin';

        if (!isOwner && !isAdmin) {
            throw new ApiError(403, 'Unauthorized! You do not have permission to delete this job.');
        }

        // Clean up applications for this job
        await Application.deleteMany({ job: jobId });

        await Job.findByIdAndDelete(jobId);
        return true;
    }

    /**
     * 🔖 Bookmark / Save Job for JobSeeker
     */
    static async toggleSaveJob(userId, jobId) {
        const user = await User.findById(userId);
        const job = await Job.findById(jobId);

        if (!job) {
            throw new ApiError(404, 'Job not found');
        }

        const isSaved = user.savedJobs.includes(jobId);

        if (isSaved) {
            user.savedJobs = user.savedJobs.filter((id) => id.toString() !== jobId.toString());
        } else {
            user.savedJobs.push(jobId);
        }

        await user.save();
        return { isSaved: !isSaved, savedJobsCount: user.savedJobs.length };
    }
}

export default JobService;
