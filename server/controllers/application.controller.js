import ApplicationService from '../services/application.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const applyJob = catchAsync(async (req, res) => {
    const application = await ApplicationService.applyJob(req.params.id, req.user._id);
    res.status(201).json(new ApiResponse(201, application, 'Applied for job successfully!'));
});

export const getAppliedJobs = catchAsync(async (req, res) => {
    const applications = await ApplicationService.getAppliedJobs(req.user._id);
    res.status(200).json(new ApiResponse(200, applications, 'Applied jobs fetched successfully!'));
});

export const getApplicantsForJob = catchAsync(async (req, res) => {
    const data = await ApplicationService.getApplicantsForJob(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, data, 'Applicants list fetched successfully!'));
});

export const getApplicationById = catchAsync(async (req, res) => {
    const application = await ApplicationService.getApplicationById(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, application, 'Application details fetched successfully!'));
});

export const updateApplicationStatus = catchAsync(async (req, res) => {
    const application = await ApplicationService.updateApplicationStatus(
        req.params.id,
        req.body.status,
        req.user._id
    );
    res.status(200).json(new ApiResponse(200, application, 'Application status updated successfully!'));
});

export const withdrawApplication = catchAsync(async (req, res) => {
    await ApplicationService.withdrawApplication(req.params.id, req.user._id);
    res.status(200).json(new ApiResponse(200, {}, 'Application withdrawn successfully!'));
});

export const deleteApplication = catchAsync(async (req, res) => {
    await ApplicationService.deleteApplication(req.params.id);
    res.status(200).json(new ApiResponse(200, {}, 'Application deleted successfully!'));
});
