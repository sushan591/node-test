import Joi from '@hapi/joi';

import validate from '../utils/validate';

// Validation schema
const loginSchema = Joi.object({
    email: Joi.string().label('Email').required(),
    password: Joi.string().label('Password').min(8).required(),
});

/**
 * Validate user's login request.
 *
 * @param   {Object}   req
 * @param   {Object}   res
 * @param   {Function} next
 * @returns {Promise}
 */
async function authLoginValidator(req, res, next) {
    return validate(req.body, loginSchema)
        .then(() => next())
        .catch((err) => next(err));
}


export { authLoginValidator };
