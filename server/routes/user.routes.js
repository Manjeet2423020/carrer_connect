import express from 'express';
import { getProfile, updateProfile, uploadResume } from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import upload from '../config/multer.js';

const router = express.Router();

// All user routes require authentication guard (`verifyJWT`)
router.use(verifyJWT);

// 👤 Get User Profile
router.get('/profile', getProfile);

// ✏️ Update Profile Details (Bio, Skills, Phone)
router.put('/profile', updateProfile);

// 📄 Upload Resume PDF to Cloudinary
router.post('/upload-resume', upload.single('resume'), uploadResume);

export default router;
