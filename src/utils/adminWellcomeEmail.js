import nodemailer from 'nodemailer';
import { adminUserWelcomeEmailTemplate } from './emailUtils.js';
import { SENDER_EMAIL_PASS, SENDER_EMAIL_USER } from '../config/appconfig.js';

export const sendAdminWelcomeEmail = async (newUser, password, portalBaseUrl) => {
    console.log("🚀 ~ sendAdminWelcomeEmail ~ newUser:", newUser)
    try {
        const emailContent = adminUserWelcomeEmailTemplate(newUser.name, password, portalBaseUrl);

        const transporter = nodemailer.createTransport({
            host: 'mail.mailinator.com', // Mailinator does not support sending emails
            port: 587,
            secure: false,
            auth: {
                user: SENDER_EMAIL_USER,
                pass: SENDER_EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        

        const mailOptions = {
            from: '"Apex Grocery" <apex@apexgrocery.com>',
            to: newUser.email,
            subject: 'Welcome to Apex Grocery - Admin Access',
            html: emailContent,
        };

        await transporter.sendMail(mailOptions);
        console.log('✅ Admin welcome email sent to:', newUser.email);
    } catch (error) {
        console.error('❌ Error sending admin welcome email:', error);
    }
};

export default sendAdminWelcomeEmail;
