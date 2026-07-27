import ApplicationService from '../services/application.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const applyJob = catchAsync(async (req, res) => {
    const application = await ApplicationService.applyJob(req.params.id, req.user._id);
    res.status(201).json(new ApiResponse(201, application, 'Applied for job successfully!'));
});

export const getAppliedJobs = catchAsync(async (req, res) => {
    const applications = await ApplicationService.getAppliedJobs(req.user._id);
    res.status(200).json(new ApiResponse(200, applications, 'Applied jobs retrieved successfully!'));
});

export const getApplicantsForJob = catchAsync(async (req, res) => {
    const data = await ApplicationService.getApplicantsForJob(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, data, 'Applicants list retrieved successfully!'));
});

export const updateApplicationStatus = catchAsync(async (req, res) => {
    const application = await ApplicationService.updateApplicationStatus(
        req.params.id,
        req.body.status,
        req.user._id
    );
    res.status(200).json(new ApiResponse(200, application, 'Application status updated successfully!'));
});

export const getRecruiterDashboard = catchAsync(async (req, res) => {
    const metrics = await ApplicationService.getRecruiterDashboard(req.user._id);
    res.status(200).json(new ApiResponse(200, metrics, 'Recruiter dashboard metrics retrieved!'));
});

export const getAdminDashboard = catchAsync(async (req, res) => {
    const metrics = await ApplicationService.getAdminDashboard();
    res.status(200).json(new ApiResponse(200, metrics, 'Admin dashboard metrics retrieved!'));
});
