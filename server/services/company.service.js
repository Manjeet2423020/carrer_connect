import Company from '../models/Company.js';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import { generateSlug } from '../utils/generateSlug.js';
import cloudinary from '../config/cloudinary.js';
import fs from 'fs';

/**
 * @description Company Management Business Logic Service Layer
 */
class CompanyService {
    /**
     * 🏢 Register / Create a new Company
     */
    static async createCompany(companyData, userId, file) {
        const { name, description, website, location } = companyData;

        // Check if company with same name already exists
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

        // Create Company document in MongoDB
        const company = await Company.create({
            name,
            description,
            website,
            location,
            logo: logoUrl,
            slug,
            userId,
        });

        // Recruiter ke profile object me is Company ki ID store kar dete hain
        await User.findByIdAndUpdate(userId, {
            'profile.company': company._id,
        });

        return company;
    }

    /**
     * 🏢 Get all companies created by logged-in Recruiter
     */
    static async getRecruiterCompanies(userId) {
        const companies = await Company.find({ userId }).sort({ createdAt: -1 });
        return companies;
    }

    /**
     * 🔍 Get Company Details by ID
     */
    static async getCompanyById(companyId) {
        const company = await Company.findById(companyId);
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

        // 🔒 Security Check: Sirf wahi recruiter edit kar sakta hai jisne company banayi ho
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
     * 🗑️ Delete Company
     */
    static async deleteCompany(companyId, userId) {
        const company = await Company.findById(companyId);
        if (!company) {
            throw new ApiError(404, 'Company not found');
        }

        if (company.userId.toString() !== userId.toString()) {
            throw new ApiError(403, 'Unauthorized! You can only delete your own company.');
        }

        await Company.findByIdAndDelete(companyId);
        return true;
    }
}

export default CompanyService;
