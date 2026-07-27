import express from 'express';
import { register, login, refreshToken, logout } from '../controllers/auth.controller.js';
import { validate, registerValidation, loginValidation } from '../validations/auth.validation.js';
import { verifyJWT } from '../middleware/verifyJWT.js';
import upload from '../config/multer.js';

const router = express.Router();

// 📝 Register User (Multer handles optional profile photo + Validation)
router.post('/register', upload.single('profilePhoto'), validate(registerValidation), register);

// 🔑 Login User (Validates email & password input format)
router.post('/login', validate(loginValidation), login);

// 🔄 Refresh Access Token
router.post('/refresh-token', refreshToken);

// 🚪 Logout User (Requires verifyJWT authentication guard)
router.post('/logout', verifyJWT, logout);

export default router;
