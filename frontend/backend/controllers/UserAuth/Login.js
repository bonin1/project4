const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const UserModel = require('../../models/UserModel');
const AppError = require('../../utils/AppError');
const { MESSAGES, HTTP_STATUS } = require('../../constants');

const createToken = (userId) => {
    return jwt.sign(
        { id: userId },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
    );
};

exports.UserLogin = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            throw new AppError(MESSAGES.MISSING_CREDENTIALS, HTTP_STATUS.BAD_REQUEST);
        }

        if (!validator.isEmail(email)) {
            throw new AppError(MESSAGES.INVALID_EMAIL, HTTP_STATUS.BAD_REQUEST);
        }

        const user = await UserModel.findOne({ 
            where: { email }
        });

        if (!user) {
            throw new AppError(MESSAGES.USER_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }


        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
        }


        const token = createToken(user.id, user.role);

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 
        });

        res.status(HTTP_STATUS.OK).json({
            status: 'success',
            data: {
                token,
                user: {
                    id: user.id,
                    email: user.email
                }
            }
        });
    } catch (error) {
        next(error);
    }
};