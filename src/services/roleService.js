import { Role } from '../models';
import constants from '../constants/constants';
import { Op } from 'sequelize';

/**
 * Get all roles.
 *
 * @returns {Promise}
 */
export function getAllRoles(user) {
    const roleName = user.UserRole.name
    const where = {};
    where.id = { [Op.notIn]: [constants.ROLE_ADMIN_ID, constants.ROLE_SUPER_ADMIN_ID] }
    if (roleName === constants.ROLE_SUPER_ADMIN)
        where.id = { [Op.notIn]: [user.UserRole.id] }

    return Role.findAll({ where });
}

/**
 * Get a role.
 *
 * @param   {Number}  id
 * @returns {Promise}
 */
export function getRole(id) {
    return Role.findByPk(id)
}