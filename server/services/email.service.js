import transporter from '../config/nodemailer.js';

/**
 * @description Email Service Layer for sending transactional emails & OTPs
 */
class EmailService {
    /**
     * 📧 Send Welcome Email to newly registered user
     */
    static async sendWelcomeEmail(toEmail, userName) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM || 'CareerConnect <no-reply@careerconnect.com>',
                to: toEmail,
                subject: 'Welcome to CareerConnect Portal! 🎉',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Hello ${userName},</h2>
            <p>Welcome to <strong>CareerConnect</strong> - your gateway to dream career opportunities!</p>
            <p>We are thrilled to have you on board. Start exploring job openings or post jobs right away.</p>
            <br/>
            <p>Best regards,<br/>The CareerConnect Team</p>
          </div>
        `,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`❌ Email Send Failure (Welcome Email): ${error.message}`);
            // Email failure par server crash nahi karte, log kar lete hain
        }
    }

    /**
     * 🔑 Send Verification / OTP Email
     */
    static async sendOTPEmail(toEmail, otp) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM || 'CareerConnect <no-reply@careerconnect.com>',
                to: toEmail,
                subject: 'Your CareerConnect Verification Code (OTP)',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Email Verification Code</h2>
            <p>Your OTP for account verification is:</p>
            <h1 style="color: #4F46E5; letter-spacing: 4px;">${otp}</h1>
            <p>This OTP will expire in <strong>10 minutes</strong>.</p>
            <p>If you did not request this, please ignore this email.</p>
          </div>
        `,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`❌ Email Send Failure (OTP Email): ${error.message}`);
        }
    }

    /**
     * 🔒 Send Password Reset Email Link
     */
    static async sendPasswordResetEmail(toEmail, resetUrl) {
        try {
            const mailOptions = {
                from: process.env.EMAIL_FROM || 'CareerConnect <no-reply@careerconnect.com>',
                to: toEmail,
                subject: 'CareerConnect - Password Reset Request',
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
            <h2>Password Reset Request</h2>
            <p>You requested a password reset. Click the button below to reset your password:</p>
            <a href="${resetUrl}" style="background-color: #4F46E5; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 15px 0;">Reset Password</a>
            <p>This link is valid for 15 minutes only.</p>
          </div>
        `,
            };

            await transporter.sendMail(mailOptions);
        } catch (error) {
            console.error(`❌ Email Send Failure (Reset Password Email): ${error.message}`);
        }
    }
}

export default EmailService;
