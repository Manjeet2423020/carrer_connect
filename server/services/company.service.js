import Company from '../models/Company.js';
import User from '../models/User.js';
import Job from '../models/Job.js';
import ApiError from '../utils/ApiError.js';
import { generateSlug } from '../utils/generateSlug.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

/**
 * @description Company Management & Search Engine Business Logic Service Layer
 */
class CompanyService {
    /**
     * 🏢 Create a new Company
     */
    static async createCompany(companyData, userId, file) {
        const { name, description, website, location } = companyData;

        const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            if (file) fs.unlinkSync(file.path);
            throw new ApiError(400, 'Company with this name already exists!');
        }

        let logoUrl = '';
        if (file) {
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'career_connect/companies',
            });
            logoUrl = uploadResult.secure_url;
            fs.unlinkSync(file.path);
        }

        const slug = generateSlug(name);

        const company = await Company.create({
            name,
            description,
            website,
            location,
            logo: logoUrl,
            slug,
            userId,
        });

        await User.findByIdAndUpdate(userId, {
            'profile.company': company._id,
        });

        return company;
    }

    /**
     * 🔍 Get All Companies with Keyword Search, Location Filter, & Pagination (Public)
     */
    static async getAllCompanies(queryParams) {
        const { keyword, location, sort, page = 1, limit = 10 } = queryParams;

        const filterQuery = {};

        if (keyword) {
            filterQuery.name = { $regex: keyword, $options: 'i' };
        }

        if (location) {
            filterQuery.location = { $regex: location, $options: 'i' };
        }

        let sortOptions = { createdAt: -1 };
        if (sort === 'oldest') sortOptions = { createdAt: 1 };
        if (sort === 'name-asc') sortOptions = { name: 1 };

        const pageNum = Math.max(1, parseInt(page));
        const limitNum = Math.max(1, parseInt(limit));
        const skip = (pageNum - 1) * limitNum;

        const companies = await Company.find(filterQuery)
            .populate('userId', 'name email')
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum)
            .lean();

        const totalCompanies = await Company.countDocuments(filterQuery);
        const totalPages = Math.ceil(totalCompanies / limitNum);

        return {
            companies,
            pagination: {
                totalCompanies,
                totalPages,
                currentPage: pageNum,
                limit: limitNum,
                hasNextPage: pageNum < totalPages,
                hasPrevPage: pageNum > 1,
            },
        };
    }

    /**
     * 🏢 Get companies created by logged-in Recruiter
     */
    static async getRecruiterCompanies(userId) {
        const companies = await Company.find({ userId }).sort({ createdAt: -1 });
        return companies;
    }

    /**
     * 🔍 Get Single Company Details by ID
     */
    static async getCompanyById(companyId) {
        const company = await Company.findById(companyId).populate('userId', 'name email');
        if (!company) {
            throw new ApiError(404, 'Company not found');
        }
        return company;
    }

    /**
     * ✏️ Update Company Details & Logo
     */
    static async updateCompany(companyId, userId, updateData, file) {
        const company = await Company.findById(companyId);
        if (!company) {
            if (file) fs.unlinkSync(file.path);
            throw new ApiError(404, 'Company not found');
        }

        // Authorization: Owner recruiter check
        if (company.userId.toString() !== userId.toString()) {
            if (file) fs.unlinkSync(file.path);
            throw new ApiError(403, 'Unauthorized! You can only update your own company.');
        }

        if (file) {
            const uploadResult = await cloudinary.uploader.upload(file.path, {
                folder: 'career_connect/companies',
            });
            company.logo = uploadResult.secure_url;
            fs.unlinkSync(file.path);
        }

        if (updateData.name) {
            company.name = updateData.name;
            company.slug = generateSlug(updateData.name);
        }
        if (updateData.description !== undefined) company.description = updateData.description;
        if (updateData.website !== undefined) company.website = updateData.website;
        if (updateData.location) company.location = updateData.location;

        await company.save();
        return company;
    }

    /**
     * 🗑️ Delete Company (Owner or Admin)
     */
    static async deleteCompany(companyId, currentUser) {
        const company = await Company.findById(companyId);
        if (!company) {
            throw new ApiError(404, 'Company not found');
        }

        const isOwner = company.userId.toString() === currentUser._id.toString();
        const isAdmin = currentUser.role === 'admin';

        if (!isOwner && !isAdmin) {
            throw new ApiError(403, 'Unauthorized! You do not have permission to delete this company.');
        }

        // Clean up associated jobs created under this company
        await Job.deleteMany({ company: companyId });

        await Company.findByIdAndDelete(companyId);
        return true;
    }
}

export default CompanyService;
