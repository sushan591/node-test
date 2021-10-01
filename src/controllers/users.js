import { conflict, notFound, unauthorized } from '../middlewares/errorHandler';
import { createUser, getAllUsers, getUser, getUserbyEmail } from '../services/userService';
import logger from '../utils/logger';
import { authUser } from '../services/authService';

const usersController = {
    /**
     * List of User
     */
    async fetchAll(req, res, next) {
        getAllUsers()
            .then((data) => res.json({ data }))
            .catch((err) => {
                logger.error('Error on listing users');
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
            logger.error(`Error while fetching user with ID ${userId}`);
            return notFound(req, res, next);
        }

        return res.json({ data: userDetail });
    },

    /**
     * Create new user
     */

    async createUser(req, res, next) {
        const checkUserExists = await getUserbyEmail(req.body.email)

        if (checkUserExists) {
            return conflict(req, res, 'Email has already been taken.')
        }

        createUser(req.body)
            .then((data) => res.json({ data }))
            .catch((err) => {
                logger.error('Error on listing users');
                next(err);
            });
    },

    /**
     * User Login
     */
    async authLogin(req, res, next) {
        await authUser(req.body, (err, data) => {
            if (err || data.response === "errors") {
                return unauthorized(req, res, "Invalid email or password")
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
    }

};

module.exports = usersController;
