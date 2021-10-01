import Joi from '@hapi/joi';

import validate from '../utils/validate';

// password validation pattern
const pattern = /^(?=.*[\d])(?=.*[!@#$%^&*])(?=.*[A-Z])[a-zA-Z0-9!@#$%^&*]{8,}$/;

const createUserSchema = Joi.object({
    name: Joi.string().label('Name').max(225).required(),
    email: Joi.string().label('Email').required(),
    password: Joi.string().label('Password').regex(pattern).required(),
    confirm_password: Joi.string().label('Confirm Password').valid(Joi.ref('password')).required(),
    phone: Joi.string().label('Phone').max(20).optional(),
    status: Joi.boolean().label('Status').optional(),
    image_url: Joi.string().label('Image').optional(),
    reset_token: Joi.string().label('Token').optional(),
    role_id: Joi.number().label('Role').optional(),
    created_by: Joi.number().label('Created By').required(),
});

const updateUserSchema = Joi.object({
    name: Joi.string().label('Name').max(225).optional(),
    email: Joi.string().label('Email').required(),
    phone: Joi.string().label('Phone').max(20).optional(),
    status: Joi.boolean().label('Status').optional(),
    image_url: Joi.string().label('Image').optional(),
    role_id: Joi.number().label('Role').optional(),
    updated_by: Joi.number().label('Updated By').required(),
});

const updatePasswordSchema = Joi.object({
    old_password: Joi.string().label('Old Password').required(),
    password: Joi.string().label('Password').regex(pattern).required(),
    confirm_password: Joi.string().label('Confirm Password').valid(Joi.ref('password')).required(),
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
    return validate(req.body, createUserSchema)
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


/**
 * Validate update user password request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function userUpdatePasswordValidator(req, res, next) {
    return validate(req.body, updatePasswordSchema)
        .then(() => next())
        .catch((err) => next(err));
}

export { userInsertValidator, userUpdateValidator, userUpdatePasswordValidator };
