import express from 'express';
import {
    createCompany,
    getAllCompanies,
    getRecruiterCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany,
} from '../controllers/company.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { isRecruiter } from '../middleware/isRecruiter.js';
import { validate } from '../validations/auth.validation.js';
import {
    createCompanyValidation,
    updateCompanyValidation,
    companyIdValidation,
    getAllCompaniesQueryValidation,
} from '../validations/company.validation.js';
import upload from '../config/multer.js';

const router = express.Router();

// 🔍 Public Routes (Open to all candidates & guests)
router.get('/', validate(getAllCompaniesQueryValidation), getAllCompanies);
router.get('/:id', validate(companyIdValidation), getCompanyById);

// 🔒 Protected Routes (Require JWT Auth)
router.use(verifyJWT);

// 🏢 Recruiter Only Routes
router.post(
    '/',
    isRecruiter,
    upload.single('logo'),
    validate(createCompanyValidation),
    createCompany
);

router.get('/recruiter/all', isRecruiter, getRecruiterCompanies);

router.put(
    '/:id',
    isRecruiter,
    upload.single('logo'),
    validate(updateCompanyValidation),
    updateCompany
);

router.delete('/:id', validate(companyIdValidation), deleteCompany);

export default router;
