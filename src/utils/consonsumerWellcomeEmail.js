import nodemailer from 'nodemailer';

 export async function sendConsumerWelcomeEmail(user) {
    const emailContent = `<p>Welcome ${user.name},</p><p>Enjoy shopping with us! `;
    
     const transporter = nodemailer.createTransport({
                host: 'mail.mailinator.com', // Mailinator does not support sending emails
                port: 587,
                secure: false,
                tls: {
                    rejectUnauthorized: false,
                },
            });

    const mailOptions = {
        from: '"Apex Grocery" <noreply@apexgrocery.com>',
        to: user.email,
        subject: 'Welcome to Apex Grocery!',
        html: emailContent,
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Consumer welcome email sent to:', user.email);
}
