import CompanyService from '../services/company.service.js';
import ApiResponse from '../utils/ApiResponse.js';
import catchAsync from '../utils/catchAsync.js';

export const createCompany = catchAsync(async (req, res) => {
    const company = await CompanyService.createCompany(req.body, req.user._id, req.file);
    res.status(201).json(new ApiResponse(201, company, 'Company registered successfully!'));
});

export const getAllCompanies = catchAsync(async (req, res) => {
    const result = await CompanyService.getAllCompanies(req.query);
    res.status(200).json(new ApiResponse(200, result, 'Companies fetched successfully!'));
});

export const getRecruiterCompanies = catchAsync(async (req, res) => {
    const companies = await CompanyService.getRecruiterCompanies(req.user._id);
    res.status(200).json(new ApiResponse(200, companies, 'Recruiter companies fetched successfully!'));
});

export const getCompanyById = catchAsync(async (req, res) => {
    const company = await CompanyService.getCompanyById(req.params.id);
    res.status(200).json(new ApiResponse(200, company, 'Company details fetched successfully!'));
});

export const updateCompany = catchAsync(async (req, res) => {
    const company = await CompanyService.updateCompany(req.params.id, req.user._id, req.body, req.file);
    res.status(200).json(new ApiResponse(200, company, 'Company updated successfully!'));
});

export const deleteCompany = catchAsync(async (req, res) => {
    await CompanyService.deleteCompany(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, {}, 'Company deleted successfully!'));
});
