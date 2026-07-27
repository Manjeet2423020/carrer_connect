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
import { createJobValidation, updateJobValidation } from '../validations/job.validation.js';

const router = express.Router();

// 🔍 Search, Filter, Sort, Paginate Jobs (Public Route - Open for all users & guests)
router.get('/', getAllJobs);

// 📋 Get Recruiter's posted jobs
router.get('/recruiter', verifyJWT, isRecruiter, getRecruiterJobs);

// 🔍 Get Single Job Details by ID
router.get('/:id', getJobById);

// 💼 Post a New Job (Recruiter Only + Validation)
router.post('/', verifyJWT, isRecruiter, validate(createJobValidation), createJob);

// ✏️ Edit Job Posting (Recruiter Only)
router.put('/:id', verifyJWT, isRecruiter, validate(updateJobValidation), updateJob);

// 🗑️ Delete Job Posting (Recruiter Only)
router.delete('/:id', verifyJWT, isRecruiter, deleteJob);

// 🔖 Bookmark / Save Job (JobSeeker Auth Required)
router.post('/bookmark/:id', verifyJWT, toggleSaveJob);

export default router;
