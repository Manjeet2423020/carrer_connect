import mongoose from 'mongoose';

/**
 * @description MongoDB Database Connection Handler
 * Production-ready connection logic with error handling and process termination on error.
 */
const connectDB = async () => {
    try {
        // process.env.MONGODB_URI se database connection string read kar rahe hain
        const conn = await mongoose.connect(process.env.MONGODB_URI);

        console.log(`✅ MongoDB Connected Successfully: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ MongoDB Connection Error: ${error.message}`);
        // Agar DB connect nahi ho paya, toh process ko stop kar dete hain (Process failure exit code 1)
        process.exit(1);
    }
};

export default connectDB;
