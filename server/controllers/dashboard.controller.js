import DashboardService from '../services/dashboard.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const getRecruiterDashboard = catchAsync(async (req, res) => {
    const metrics = await DashboardService.getRecruiterDashboard(req.user._id);
    res.status(200).json(new ApiResponse(200, metrics, 'Recruiter dashboard analytics fetched!'));
});

export const getAdminDashboard = catchAsync(async (req, res) => {
    const metrics = await DashboardService.getAdminDashboard();
    res.status(200).json(new ApiResponse(200, metrics, 'Admin dashboard analytics fetched!'));
});
