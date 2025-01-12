const ContactModel = require('../../models/ContactModel');
const EmailService = require('../../services/emailService');

const submitContact = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const contact = await ContactModel.create({
            name,
            email,
            message
        });

        await EmailService.sendUserConfirmation({ name, email, message });

        return res.status(201).json({
            success: true,
            message: 'Contact submitted successfully',
            data: contact
        });

    } catch (error) {
        console.error('Contact submission error:', error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error',
            error: error.message
        });
    }
};

module.exports = submitContact;
