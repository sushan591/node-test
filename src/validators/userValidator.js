import Joi from '@hapi/joi';

import validate from '../utils/validate';

// Validation schema
const insertUserSchema = Joi.object({
    name: Joi.string().label('Name').max(225).required(),
    email: Joi.string().label('Email').required(),
    password: Joi.string().label('Password').max(32).required(),
    phone: Joi.string().label('Phone').max(20).optional(),
    status: Joi.boolean().label('Status').optional(),
    image_url: Joi.string().label('Image').optional(),
    reset_token: Joi.string().label('Token').optional(),
    role_id: Joi.number().label('Role').required(),
    created_by: Joi.number().label('Created By').required(),
});

const updateUserSchema = Joi.object({
    name: Joi.string().label('Name').max(225).optional(),
    email: Joi.string().label('Email').required(),
    password: Joi.string().label('Password').max(32).required(),
    phone: Joi.string().label('Phone').max(20).optional(),
    status: Joi.boolean().label('Status').optional(),
    image_url: Joi.string().label('Image').optional(),
    reset_token: Joi.string().label('Token').optional(),
    role_id: Joi.number().label('Role').required(),
    updated_by: Joi.number().label('Updated By').required(),
});

/**
 * Validate create user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function userInsertValidator(req, res, next) {
    return validate(req.body, insertUserSchema)
        .then(() => next())
        .catch((err) => next(err));
}

/**
 * Validate update user request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function userUpdateValidator(req, res, next) {
    return validate(req.body, updateUserSchema)
        .then(() => next())
        .catch((err) => next(err));
}

export { userInsertValidator, userUpdateValidator };
