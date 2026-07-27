import express from 'express';
import {
    getProfile,
    getUserById,
    updateProfile,
    updatePassword,
    uploadResume,
    getAllUsers,
    deleteUser,
} from '../controllers/user.controller.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import { isAdmin } from '../middleware/isAdmin.js';
import { validate } from '../validations/auth.validation.js';
import {
    updatePasswordValidation,
    userIdValidation,
    getAllUsersQueryValidation,
} from '../validations/user.validation.js';
import upload from '../config/multer.js';

const router = express.Router();

// Require Login for all routes below
router.use(verifyJWT);

// 👤 Logged-in User Profile Routes
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.put('/update-password', validate(updatePasswordValidation), updatePassword);
router.post('/upload-resume', upload.single('resume'), uploadResume);

// 🔍 View Any User By ID (Protected)
router.get('/:id', validate(userIdValidation), getUserById);

// 👑 ADMIN ONLY ROUTES
router.get('/', isAdmin, validate(getAllUsersQueryValidation), getAllUsers);
router.delete('/:id', isAdmin, validate(userIdValidation), deleteUser);

export default router;
