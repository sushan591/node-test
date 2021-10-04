import { conflict, notFound, unauthorized, unprocessableEntity } from '../middlewares/errorHandler';
import { createUser, getAllUsers, getUser, getUserbyEmail, updateUser, changePassword, forgotPassword, resetPassword } from '../services/userService';
import logger from '../utils/logger';
import { authUser } from '../services/authService';
import HttpStatus from 'http-status-codes'
import customMessages from './../constants/customMessages';
import { sendMail } from '../utils/email';

const usersController = {
    /**
     * List of User
     */
    async fetchAll(req, res, next) {
        getAllUsers()
            .then((data) => res.json({ data }))
            .catch((err) => {
                logger.error(customMessages.ERROR_LISTING_USERS);
                next(err);
            });
    },

    /**
     * show User
     */
    async show(req, res, next) {
        const userId = req.params.id;

        const userDetail = await getUser(userId);

        if (!userDetail) {
            logger.error(`${customMessages.ERROR_FETCHING_USER_ID} ${userId}`);
            return notFound(req, res, customMessages.NO_USER_FOUND);
        }

        return res.json({ data: userDetail });
    },

    /**
     * Create new user
     */

    async createUser(req, res, next) {
        const checkUserExists = await getUserbyEmail(req.body.email)

        if (checkUserExists) {
            return conflict(req, res, customMessages.EMAIL_ALREADY_USED)
        }

        createUser(req.body)
            .then((data) => res.status(HttpStatus.CREATED).json({ data }))
            .catch((err) => {
                logger.error(customMessages.ERROR_CREATING_USER);
                next(err);
            });
    },

    /**
     * User Login
     */
    async authLogin(req, res, next) {
        await authUser(req.body, (err, data) => {
            if (err || data.response === "errors") {
                return unauthorized(req, res, customMessages.ERROR_SIGN_IN)
            }
            res.json({ data });
        });

    },

    /**
     * Get auth detail
     */

    async getAuthDetail(req, res, next) {
        // get auth detail from req (middleware)
        const { user } = req;

        res.json({ data: user })
    },

    /**
     * Update user
     */

    async updateUser(req, res, next) {
        const { id } = req.params;
        const checkUserExists = await getUser(id)

        if (!checkUserExists) {
            return notFound(req, res, customMessages.NO_USER_FOUND)
        }

        updateUser(id, req.body)
            .then((data) => {
                if (data[0] !== 1) {
                    return unprocessableEntity(req, res, customMessages.FAILURE_USER_UPDATE)
                }
                return res.json({ data: { message: customMessages.SUCCESS_USER_UPDATE } })
            })
            .catch((err) => {
                logger.error(customMessages.FAILURE_USER_UPDATE);
                next(err);
            });
    },


    /**
     * change password
     */

    async changePassword(req, res, next) {
        const { user } = req;
        const { old_password: oldPassword, password } = req.body
        const validatePassword = await user.correctPassword(oldPassword);

        if (!validatePassword)
            return unauthorized(req, res, customMessages.INVALID_PASSWORD)

        changePassword(user.id, password)
            .then((data) => {
                if (!data.id) {
                    return unprocessableEntity(req, res, customMessages.FAILURE_PASSWORD_UPDATE)
                }
                return res.json({ data: { message: customMessages.SUCCESS_PASSWORD_UPDATE } })
            })
            .catch((err) => {
                logger.error(customMessages.FAILURE_PASSWORD_UPDATE);
                next(err);
            });
    },


    /**
     * forgot password
     */

    async forgotPassword(req, res, next) {
        const { email, base_url: url } = req.body
        const isValidUser = await getUserbyEmail(email);


        if (!isValidUser) {
            return unprocessableEntity(req, res, customMessages.INVALID_EMAIL)
        }

        let resetUrl = url;
        resetUrl += url[url.length - 1] === '/' ? `api/users/${isValidUser.id}/reset-password` : `/api/users/${isValidUser.id}/reset-password`

        forgotPassword(isValidUser)
            .then((data) => {
                if (!data.id) {
                    return unprocessableEntity(req, res, customMessages.FORGOT_PASSWORD_FAILURE)
                }

                resetUrl += `?token=${data.reset_token}`

                // TO-DO: fix body for email service later
                sendMail(isValidUser.email, customMessages.EMAIL_SUBJECT_RESET, resetUrl, null, (err, result) => {
                    if (err) {
                        logger.error(`${customMessages.SMTP_ERROR}, err: ${err}`)
                        return unprocessableEntity(req, res, customMessages.SMTP_ERROR)
                    }
                })

                return res.json({ data: { message: customMessages.FORGOT_PASSWORD_SUCCESS, reset_url: resetUrl } })
            })
            .catch((err) => {
                logger.error(customMessages.FORGOT_PASSWORD_FAILURE);
                next(err);
            });
    },

    /**
     * verify reset token
     */

    async verifyResetToken(req, res, next) {
        const { id } = req.params
        const { token } = req.query

        const isValidUser = await getUser(id);

        if (!isValidUser) {
            return unprocessableEntity(req, res, customMessages.INVALID_EMAIL)
        }

        if (token === isValidUser.reset_token)
            return res.json({ data: { message: "valid token" } })

        return unauthorized(req, res, "Invalid user / token")
    },


    /**
     * change password
     */

    async resetPassword(req, res, next) {
        const { id } = req.params;
        const { token, password } = req.body

        const isValidUser = await getUser(id);
        if (!isValidUser) {
            return unprocessableEntity(req, res, customMessages.INVALID_EMAIL)
        }

        if (isValidUser.reset_token !== token) {
            return unauthorized(req, res, customMessages.INVALID_TOKEN)
        }

        resetPassword(isValidUser, password)
            .then((data) => {
                if (!data.id) {
                    return unprocessableEntity(req, res, customMessages.RESET_PASSWORD_FAILURE)
                }

                sendMail(isValidUser.email, customMessages.EMAIL_SUBJECT_RESET_SUCCESS, customMessages.EMAIL_BODY_RESET_SUCCESS, null, (err, result) => {
                    if (err) {
                        logger.error(`${customMessages.SMTP_ERROR}, err: ${err}`)
                        return unprocessableEntity(req, res, customMessages.SMTP_ERROR)
                    }
                })

                return res.json({ data: { message: customMessages.RESET_PASSWORD_SUCCESS } })
            })
            .catch((err) => {
                logger.error(customMessages.RESET_PASSWORD_FAILURE);
                next(err);
            });
    },

};

module.exports = usersController;
