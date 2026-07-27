import express from 'express';
import {
    applyJob,
    getAppliedJobs,
    getApplicantsForJob,
    updateApplicationStatus,
    getRecruiterDashboard,
    getAdminDashboard,
} from '../controllers/application.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { isRecruiter } from '../middleware/isRecruiter.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validate } from '../validations/auth.validation.js';
import {
    applyJobValidation,
    updateApplicationStatusValidation,
} from '../validations/application.validation.js';

const router = express.Router();

// All application routes require login authentication (`verifyJWT`)
router.use(verifyJWT);

// 📝 Candidate Apply Job Endpoint
router.post('/apply/:id', validate(applyJobValidation), applyJob);

// 📋 Candidate View Applied Jobs Endpoint
router.get('/applied', getAppliedJobs);

// 👥 Recruiter View Applicants for a specific Job
router.get('/job/:id/applicants', isRecruiter, getApplicantsForJob);

// ⚡ Recruiter Update Candidate Application Status (Accept/Reject/Interviewing)
router.put('/status/:id', isRecruiter, validate(updateApplicationStatusValidation), updateApplicationStatus);

// 📊 Recruiter Analytics Dashboard Metrics Endpoint
router.get('/dashboard/recruiter', isRecruiter, getRecruiterDashboard);

// 👑 Admin Master Dashboard Metrics Endpoint
router.get('/dashboard/admin', isAdmin, getAdminDashboard);

export default router;
