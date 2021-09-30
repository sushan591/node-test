import { notFound } from '../middlewares/errorHandler';
import { createUser, getAllUsers, getUser } from '../services/userService';
import logger from '../utils/logger';

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
        createUser(req.body)
            .then((data) => res.json({ data }))
            .catch((err) => {
                logger.error('Error on listing users');
                next(err);
            });
    },

};

module.exports = usersController;
