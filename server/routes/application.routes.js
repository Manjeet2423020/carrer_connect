import express from 'express';
import {
    applyJob,
    getAppliedJobs,
    getApplicantsForJob,
    getApplicationById,
    updateApplicationStatus,
    withdrawApplication,
    deleteApplication,
} from '../controllers/application.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { isRecruiter } from '../middleware/isRecruiter.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validate } from '../validations/auth.validation.js';
import {
    applyJobValidation,
    applicationIdValidation,
    updateApplicationStatusValidation,
} from '../validations/application.validation.js';

const router = express.Router();

// Require Login for all application routes
router.use(verifyJWT);

// 📝 Jobseeker Candidate Endpoints
router.post('/apply/:id', validate(applyJobValidation), applyJob);
router.get('/applied', getAppliedJobs);
router.delete('/withdraw/:id', validate(applicationIdValidation), withdrawApplication);

// 🔍 Single Application View
router.get('/:id', validate(applicationIdValidation), getApplicationById);

// 👥 Recruiter Owner Endpoints
router.get('/job/:id/applicants', isRecruiter, validate(applyJobValidation), getApplicantsForJob);
router.put('/status/:id', isRecruiter, validate(updateApplicationStatusValidation), updateApplicationStatus);

// 👑 Admin Endpoint
router.delete('/:id', isAdmin, validate(applicationIdValidation), deleteApplication);

export default router;
