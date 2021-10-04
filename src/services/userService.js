import { User } from './../models';
import logger from '../utils/logger';
import constants from '../constants/constants';

const { v4: uuidv4 } = require('uuid');


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
    return User.findByPk(id)
}

/**
 * Create a user.
 *
 * @param   {Object}  body
 * @returns {Promise}
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
 * Update a user.
 *
 * @param   {Number}  id
 * @param   {Object}  body
 * @returns {Promise}
 */
export async function updateUser(id, body) {
    return await User.update(body, {
        where: {
            id
        }
    })
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


/**
 * change user password
 *
 * @param   {Number}  id
 * @param   {String}  email
 * @returns {Promise}
 */
export async function changePassword(id, password) {
    const user = await User.findOne({ where: { id } });

    return user.update({ password })
}


/**
 * forgot password
 *
 * @param   {Object}  userToRecover
 * @returns {Promise}
 */
export async function forgotPassword(userToRecover) {

    const resetToken = uuidv4();

    return userToRecover.update({ reset_token: resetToken })

}


/**
 * reset password
 *
 * @param   {Object}  userDetail
 * @param   {String}  password
 * @returns {Promise}
 */
export async function resetPassword(userDetail, password) {
    return userDetail.update({ reset_token: null, password })

}
