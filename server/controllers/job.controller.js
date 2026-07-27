import JobService from '../services/job.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const createJob = catchAsync(async (req, res) => {
    const job = await JobService.createJob(req.body, req.user._id);
    res.status(201).json(new ApiResponse(201, job, 'Job posted successfully!'));
});

export const getAllJobs = catchAsync(async (req, res) => {
    const result = await JobService.getAllJobs(req.query);
    res.status(200).json(new ApiResponse(200, result, 'Jobs fetched successfully!'));
});

export const getJobById = catchAsync(async (req, res) => {
    const job = await JobService.getJobById(req.params.id);
    res.status(200).json(new ApiResponse(200, job, 'Job details retrieved successfully!'));
});

export const getRecruiterJobs = catchAsync(async (req, res) => {
    const jobs = await JobService.getRecruiterJobs(req.user._id);
    res.status(200).json(new ApiResponse(200, jobs, 'Recruiter jobs retrieved successfully!'));
});

export const updateJob = catchAsync(async (req, res) => {
    const job = await JobService.updateJob(req.params.id, req.user._id, req.body);
    res.status(200).json(new ApiResponse(200, job, 'Job updated successfully!'));
});

export const deleteJob = catchAsync(async (req, res) => {
    await JobService.deleteJob(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, {}, 'Job deleted successfully!'));
});

export const toggleSaveJob = catchAsync(async (req, res) => {
    const result = await JobService.toggleSaveJob(req.user._id, req.params.id);
    res.status(200).json(new ApiResponse(200, result, 'Job bookmark updated successfully!'));
});
