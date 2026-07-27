import express from 'express';
import {
    getRecruiterDashboard,
    getAdminDashboard,
} from '../controllers/dashboard.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { isRecruiter } from '../middleware/isRecruiter.js';
import { isAdmin } from '../middleware/isAdmin.js';

const router = express.Router();

// Require Login for all dashboard routes
router.use(verifyJWT);

// 📊 Recruiter Analytics Dashboard
router.get('/recruiter', isRecruiter, getRecruiterDashboard);

// 👑 Master Admin Analytics Dashboard
router.get('/admin', isAdmin, getAdminDashboard);

export default router;
