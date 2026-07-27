import multer from 'multer';
import path from 'path';
import ApiError from '../utils/ApiError.js';

/**
 * @description Multer Local Disk Storage Configuration
 * Files are temporarily stored in `uploads/` folder before being sent to Cloudinary.
 */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        // Unique filename = originalname - timestamp .extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    },
});

/**
 * @description File Validation Filter (Images & PDFs/Docs only)
 */
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/png',
        'image/webp',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(
            new ApiError(
                400,
                'Invalid file type. Only JPG, PNG, WEBP, PDF, DOC and DOCX files are allowed!'
            ),
            false
        );
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024, // Maximum file size 5MB limit
    },
});

export default upload;
