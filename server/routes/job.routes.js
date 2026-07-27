import express from 'express';
import {
    createJob,
    getAllJobs,
    getJobById,
    getRecruiterJobs,
    updateJob,
    deleteJob,
    toggleSaveJob,
} from '../controllers/job.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { isRecruiter } from '../middleware/isRecruiter.js';
import { validate } from '../validations/auth.validation.js';
import {
    createJobValidation,
    updateJobValidation,
    jobIdValidation,
    getAllJobsQueryValidation,
} from '../validations/job.validation.js';

const router = express.Router();

// 🔍 Public Search & Details Routes (Open to all)
router.get('/', validate(getAllJobsQueryValidation), getAllJobs);
router.get('/:id', validate(jobIdValidation), getJobById);

// 🔒 Protected Routes (Require Login)
router.use(verifyJWT);

// 🔖 Bookmark Job Endpoint (Jobseeker Only)
router.post('/bookmark/:id', validate(jobIdValidation), toggleSaveJob);

// 💼 Recruiter Only Routes
router.get('/recruiter/all', isRecruiter, getRecruiterJobs);
router.post('/', isRecruiter, validate(createJobValidation), createJob);
router.put('/:id', isRecruiter, validate(updateJobValidation), updateJob);
router.delete('/:id', validate(jobIdValidation), deleteJob);

export default router;
