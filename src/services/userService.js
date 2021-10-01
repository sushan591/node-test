import { User } from './../models';
import logger from '../utils/logger';
import constants from './../utils/constants';

/**
 * Get all users.
 *
 * @returns {Promise}
 */
export function getAllUsers() {
    return User.findAll({ where: { status: constants.STATUS_TRUE } });
}

/**
 * Get a user.
 *
 * @param   {Number}  id
 * @returns {Promise}
 */
export function getUser(id) {
    return User.findOne({
        where: {
            id,
        },
    })
}

/**
 * Create new user
 */

export async function createUser(body) {
    return await User.build(body)
        .save()
        .then((data) => data)
        .catch((err) => {
            logger.error('Error on creating new user ', err);
        });
}

/**
 * Get a user by email.
 *
 * @param   {String}  email
 * @returns {Promise}
 */
export function getUserbyEmail(email) {
    return User.findOne({
        where: {
            email,
        },
    })
}