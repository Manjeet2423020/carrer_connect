import dotenv from 'dotenv';
import connectDB from './database/connectDB.js';
import app from './app.js';

// ⚙️ Load Environment Variables (.env file read karna)
dotenv.config();

const PORT = process.env.PORT || 5000;

/**
 * 🚀 Start Server & Database Connection
 */
const startServer = async () => {
    try {
        // 1. Connect MongoDB Database
        await connectDB();

        // 2. Start Express Server Listener
        app.listen(PORT, () => {
            console.log(`
      =======================================================
      🚀 CareerConnect Backend Server Running Successfully!
      📡 Port: ${PORT}
      🛠️ Mode: ${process.env.NODE_ENV || 'development'}
      🌐 Health Check: http://localhost:${PORT}/
      =======================================================
      `);
        });
    } catch (error) {
        console.error(`❌ Failed to start server: ${error.message}`);
        process.exit(1);
    }
};

startServer();
