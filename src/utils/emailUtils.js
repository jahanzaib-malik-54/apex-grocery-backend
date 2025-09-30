import nodemailer from 'nodemailer';
import { openApexGroceryAppLink, portalResetPasswordLink, SENDER_EMAIL_PASS, SENDER_EMAIL_USER } from '../config/appconfig.js';
import User from '../models/authModel.js';
import { isUser } from './role.js';

 async function sendEmail(to, token) {
    try {
        // Find and update the user with the resetToken
        const user = await User.findOneAndUpdate(
            { email: to },
            { resetToken: token },
            { new: true }
        );

        if (!user) {
            throw new Error('User not found for provided email.');
        }

        const transporter = nodemailer.createTransport({
            host: 'mail.mailinator.com',
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
            to,
            subject: 'Password Reset Request',
            text: `Your password reset token is: ${token}\n\nUse this token to reset your password.`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('✅ Email sent: ', info.messageId);

        return token;
    } catch (error) {
        console.error('❌ Error sending email:', error);
        throw error;
    }
}
export default sendEmail


export const adminUserWelcomeEmailTemplate = (name, password, portalBaseUrl) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>${name},</h2>
      <p>Welcome to the Apex Grocery team! We’re so excited to have you on board as an administrator.</p>
      <p>As an administrator, you’ll have access to a variety of tools and features to help you manage your Apex Grocery account. You’ll be able to manage app users and access other system data.</p>
      <p><strong>Your temporary password:</strong> ${password}</p>
      <p>Login to the Administrative web portal below:</p>
      <p style="margin-top: 20px;">
        <a href="${portalBaseUrl}" target="_blank" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
          Access the Admin Portal
        </a>
      </p>
      <p>Best regards,<br>The Apex Grocery Team</p>
    </div>
  `;
};

export const forgotPasswordEmailTemplate = (name, role, resetToken) => {
    let link = isUser(role) ? openApexGroceryAppLink : portalResetPasswordLink;
    link = link + `?resetToken=${resetToken}`;
    return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>${name},</h2>
      <p>A request has been received to change the password for your Apex Grocery .</p>
      <p style="margin-top: 20px;">
        <a href="${link}" target="_blank" style="display: inline-block; padding: 10px 20px; color: #ffffff; background-color: #4CAF50; text-decoration: none; border-radius: 5px;">
          Click here to reset your password !
        </a>
      </p>
    </div>
  `;
};

export const changePasswordConfirmationEmailTemplate = (name) => {
    return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>${name},</h2>
      <p>
        The password for your Apex Grocery account has been recently updated. If you did not request this password reset, please contact us immediately by simply replying to this message.
      </p>
      <p style="margin-top: 20px;">Thank you,<br>The Mind Hue Team</p>
    </div>
  `;
};
