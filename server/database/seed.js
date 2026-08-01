import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import Company from '../models/Company.js';
import Job from '../models/Job.js';
import Application from '../models/Application.js';
import { generateSlug } from '../utils/generateSlug.js';

// Load environment variables (.env file read karne ke liye)
dotenv.config();

/**
 * 🌿 Database Seeding Function
 */
const seedDatabase = async () => {
    try {
        console.log('🔄 Connecting to MongoDB for Database Seeding...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✅ Connected to Database!');

        // 1. Existing Collections Wipe/Clean karte hain
        console.log('🧹 Cleaning existing Database Collections...');
        await User.deleteMany({});
        await Company.deleteMany({});
        await Job.deleteMany({});
        await Application.deleteMany({});

        // 2. Demo Users Create karte hain
        console.log('👤 Creating Demo Users (Admin, Recruiter, Jobseeker)...');

        // Admin User
        const adminUser = await User.create({
            name: 'System Admin',
            email: 'admin@careerconnect.com',
            password: 'password123',
            role: 'admin',
            phoneNumber: '9999999999',
            isEmailVerified: true,
        });

        // Recruiter User 1
        const recruiterUser1 = await User.create({
            name: 'Sundar Pichai',
            email: 'recruiter@google.com',
            password: 'password123',
            role: 'recruiter',
            phoneNumber: '9876543210',
            isEmailVerified: true,
        });

        // Recruiter User 2
        const recruiterUser2 = await User.create({
            name: 'Satya Nadella',
            email: 'recruiter@microsoft.com',
            password: 'password123',
            role: 'recruiter',
            phoneNumber: '9876543211',
            isEmailVerified: true,
        });

        // Candidate Jobseeker User
        const candidateUser = await User.create({
            name: 'Manjeet Kumar',
            email: 'jobseeker@gmail.com',
            password: 'password123',
            role: 'jobseeker',
            phoneNumber: '9123456789',
            isEmailVerified: true,
            profile: {
                bio: 'Passionate Full Stack Node.js & React Developer looking for awesome opportunities.',
                skills: ['Node.js', 'Express.js', 'MongoDB', 'React', 'JavaScript'],
                resume: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                resumeOriginalName: 'Manjeet_Resume.pdf',
            },
        });

        // 3. Demo Companies Create karte hain
        console.log('🏢 Creating Demo Companies...');

        const company1 = await Company.create({
            name: 'Google India',
            description: 'Organizing the world information and making it universally accessible and useful.',
            website: 'https://google.com',
            location: 'Bangalore, India',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg',
            slug: generateSlug('Google India'),
            userId: recruiterUser1._id,
        });

        const company2 = await Company.create({
            name: 'Microsoft India',
            description: 'Empowering every person and every organization on the planet to achieve more.',
            website: 'https://microsoft.com',
            location: 'Hyderabad, India',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
            slug: generateSlug('Microsoft India'),
            userId: recruiterUser2._id,
        });

        // Update Recruiter Profile with Company Reference
        recruiterUser1.profile.company = company1._id;
        await recruiterUser1.save();

        recruiterUser2.profile.company = company2._id;
        await recruiterUser2.save();

        // 4. Demo Jobs Create karte hain
        console.log('💼 Creating Demo Job Postings...');

        const sampleJobs = [
            {
                title: 'Senior Backend Architect (Node.js)',
                description: 'We are seeking an experienced Backend Architect to design scalable microservices using Node.js, Express, MongoDB, and Redis.',
                requirements: ['Node.js', 'Express.js', 'MongoDB', 'Docker', 'System Design'],
                salary: 2400000,
                experienceLevel: 'senior',
                location: 'Remote',
                jobType: 'full-time',
                position: 3,
                company: company1._id,
                created_by: recruiterUser1._id,
                slug: generateSlug('Senior Backend Architect Nodejs'),
            },
            {
                title: 'Full Stack MERN Developer',
                description: 'Looking for a skilled MERN Stack engineer capable of building high-performance web interfaces and robust REST APIs.',
                requirements: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
                salary: 1400000,
                experienceLevel: 'mid',
                location: 'Bangalore, India',
                jobType: 'full-time',
                position: 5,
                company: company1._id,
                created_by: recruiterUser1._id,
                slug: generateSlug('Full Stack MERN Developer'),
            },
            {
                title: 'Frontend React Engineer',
                description: 'Join Microsoft Cloud Team to build next-generation enterprise dashboards using React, Redux Toolkit, and TypeScript.',
                requirements: ['React', 'TypeScript', 'Redux', 'HTML5/CSS3', 'REST APIs'],
                salary: 1800000,
                experienceLevel: 'mid',
                location: 'Hyderabad, India',
                jobType: 'full-time',
                position: 2,
                company: company2._id,
                created_by: recruiterUser2._id,
                slug: generateSlug('Frontend React Engineer'),
            },
            {
                title: 'Backend Node.js Intern',
                description: 'Great internship opportunity for freshers to learn real-world backend architecture, REST API design, and Database indexing.',
                requirements: ['JavaScript', 'Node.js', 'Basic Express', 'MongoDB'],
                salary: 360000,
                experienceLevel: 'entry',
                location: 'Remote',
                jobType: 'internship',
                position: 4,
                company: company2._id,
                created_by: recruiterUser2._id,
                slug: generateSlug('Backend Nodejs Intern'),
            },
        ];

        await Job.insertMany(sampleJobs);

        console.log(`
    =======================================================
    🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY!
    
    🔑 DEMO LOGINS CREATED:
    👑 Admin: admin@careerconnect.com / password123
    🏢 Recruiter 1: recruiter@google.com / password123
    🏢 Recruiter 2: recruiter@microsoft.com / password123
    👤 Candidate: jobseeker@gmail.com / password123
    =======================================================
    `);

        mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error(`❌ Database Seeding Failed: ${error.message}`);
        mongoose.disconnect();
        process.exit(1);
    }
};

seedDatabase();
