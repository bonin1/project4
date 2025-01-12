module.exports = {
    emailConfig: {
        user: process.env.EMAIL_USER,
        pass: process.env.ADMIN_PASSWORD,
        adminReceiver: process.env.EMAIL_ADMIN,
        smtp: {
            host: 'smtp.gmail.com',
            port: 587,
            secure: false,
            requireTLS: true
        },
        retryAttempts: 3,
        retryDelay: 1000
    }
};
