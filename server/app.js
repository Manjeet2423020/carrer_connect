import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

// Routes Import
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import companyRoutes from './routes/company.routes.js';
import jobRoutes from './routes/job.routes.js';
import applicationRoutes from './routes/application.routes.js';

// Middlewares Import
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';

const app = express();

// ==========================================
// SECURITY & SYSTEM MIDDLEWARES
// ==========================================

// 🛡️ Helmet Security Headers (Protects against XSS, Clickjacking, etc.)
app.use(helmet());

// 📊 Morgan Request Logging (Console logger for HTTP requests)
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// 🗜️ Response Compression (Compresses HTTP response bodies for fast load speed)
app.use(compression());

// 🌐 CORS (Cross-Origin Resource Sharing Setup)
app.use(
    cors({
        origin: process.env.FRONTEND_URL || 'http://localhost:5173',
        credentials: true, // Allows HTTP-Only Cookies to be sent from Frontend
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    })
);

// 🛑 Rate Limiter (Prevents DDoS attacks & brute-force requests - max 100 requests per 15 mins)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: {
        success: false,
        message: 'Too many requests from this IP address, please try again after 15 minutes!',
    },
    standardHeaders: true,
    legacyHeaders: false,
});
app.use('/api', limiter);

// 📦 Body Parsers & Cookie Parser
app.use(express.json({ limit: '16kb' })); // JSON payload limit 16kb for security
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(cookieParser());

// Static Folder for temporary uploads (if needed)
app.use('/uploads', express.static('uploads'));

// ==========================================
// API ROUTES MOUNTING
// ==========================================

app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: '🚀 CareerConnect Production Backend API is Running Live!',
    });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/companies', companyRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/applications', applicationRoutes);

// ==========================================
// ERROR HANDLING MIDDLEWARES
// ==========================================

// 404 Route Not Found Handler
app.use(notFound);

// Centralized Global Error Handler
app.use(errorHandler);

export default app;
