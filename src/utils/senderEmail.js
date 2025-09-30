import nodemailer from 'nodemailer';

// Ensure these are defined in your environment variables

/**
 * Sends an email using SMTP.
 * @param {string} to - Recipient email address.
 * @param {string} subject - Email subject.
 * @param {string} text - Plain text content of the email.
 * @param {string} html - HTML content of the email.
 */

 const transporter = nodemailer.createTransport({
    host: 'mail.mailinator.com',
    port: 587,
    secure: false,
    // Use TLS (not SSL)
    tls: {
        rejectUnauthorized: false,
    },
        });
export const sendEmailToUser = async (email, subject, text, html) => {
    try {
        const mailOptions = {
            from: `"Apex Grocery" <apex@apexgrocery.com>`, // Sender email address
            to: email, // recipient address
            subject, // Subject line
            text, // plain text body
            html, // HTML body (optional)
        };

        // Send email
        const res = await transporter.sendMail(mailOptions);
        return res;
    } catch (error) {
        console.log('🚀 ~ $$$ ~ sendEmailToUser ~ error:', error);
        throw new Error('Email sending failed');
    }
};

export default sendEmailToUser;
