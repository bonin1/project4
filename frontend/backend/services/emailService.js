const nodemailer = require('nodemailer');
const { emailConfig } = require('../config/emailConfig');
const fs = require('fs').promises;
const path = require('path');

class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            ...emailConfig.smtp,
            auth: {
                user: emailConfig.user,
                pass: emailConfig.pass
            }
        });
    }

    async sendEmailWithRetry(mailOptions, attempts = emailConfig.retryAttempts) {
        try {
            await this.validateEmail(mailOptions.to);
            for (let i = 0; i < attempts; i++) {
                try {
                    await this.transporter.sendMail(mailOptions);
                    console.log(`Email sent successfully to ${mailOptions.to}`);
                    return true;
                } catch (error) {
                    if (i === attempts - 1) throw error;
                    await new Promise(resolve => setTimeout(resolve, emailConfig.retryDelay));
                }
            }
        } catch (error) {
            console.error('Email sending failed:', error);
            throw new Error(`Failed to send email: ${error.message}`);
        }
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            throw new Error('Invalid email address');
        }
        return true;
    }

    async sendUserConfirmation(contactForm) {
        const { email, name } = contactForm;
        const templatePath = path.resolve(__dirname, '../templates/confirmation.html');
        try {
            const template = await fs.readFile(templatePath, 'utf8');

            template = template
                .replace('{{name}}', name)
                .replace('{{email}}', email);

            const mailOptions = {
                from: `"Support Team" <${emailConfig.user}>`,
                to: email,
                subject: 'Thank you for contacting us!',
                html: template,
                headers: {
                    'X-Priority': '1',
                    'X-MSMail-Priority': 'High'
                }
            };

            return await this.sendEmailWithRetry(mailOptions);
        } catch (error) {
            console.error('Failed to send confirmation email:', error);
            throw error;
        }
    }
}

module.exports = new EmailService();