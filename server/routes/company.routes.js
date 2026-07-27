import express from 'express';
import {
    createCompany,
    getRecruiterCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
} from '../controllers/company.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { isRecruiter } from '../middleware/isRecruiter.js';
import { validate } from '../validations/auth.validation.js';
import { createCompanyValidation, updateCompanyValidation } from '../validations/company.validation.js';
import upload from '../config/multer.js';

const router = express.Router();

// 🏢 Register Company (Recruiter Only + Logo Upload + Validation)
router.post(
    '/',
    verifyJWT,
    isRecruiter,
    upload.single('logo'),
    validate(createCompanyValidation),
    createCompany
);

// 🏢 Get all companies registered by logged-in recruiter
router.get('/recruiter', verifyJWT, isRecruiter, getRecruiterCompanies);

// 🔍 Get Company Details by ID
router.get('/:id', getCompanyById);

// ✏️ Update Company (Recruiter Only)
router.put(
    '/:id',
    verifyJWT,
    isRecruiter,
    upload.single('logo'),
    validate(updateCompanyValidation),
    updateCompany
);

// 🗑️ Delete Company (Recruiter Only)
router.delete('/:id', verifyJWT, isRecruiter, deleteCompany);

export default router;
