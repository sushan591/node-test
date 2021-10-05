import customMessages from '../constants/customMessages';
import { notFound } from '../middlewares/errorHandler';
import { getAllRoles, getRole } from '../services/roleService';
import logger from '../utils/logger';

const rolesController = {
    /**
     * List all roles
     */
    async fetchAll(req, res, next) {
        getAllRoles(req.user)
            .then((data) => res.json({ data }))
            .catch((err) => {
                logger.error(customMessages.ERROR_LISTING_USERS);
                next(err);
            });
    },

    /**
     * show Role
     */
    async show(req, res, next) {
        const roleId = req.params.id;

        const roleDetail = await getRole(roleId);

        if (!roleDetail) {
            logger.error(`${customMessages.ERROR_FETCHING_ROLE_ID} ${roleId}`);
            return notFound(req, res, customMessages.NO_ROLE_FOUND);
        }

        return res.json({ data: roleDetail });
    },

};

module.exports = rolesController;
