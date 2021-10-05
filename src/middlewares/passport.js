const { ExtractJwt, Strategy } = require("passport-jwt");
const { User, Role } = require("../models");
const config = require("../config/loginConfig");
const { default: logger } = require("../utils/logger");

module.exports = function (passport) {
    const opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = config.login.jwtEncryption;
    passport.use(
        new Strategy(opts, async function (jwtPayload, done) {
            User.findOne({
                where: { id: jwtPayload.user_id },
                include: {
                    model: Role,
                    as: "UserRole",
                    attributes: ['id', 'name']
                }
            })
                .then(user => {
                    if (user) return done(null, user);
                    else return done(null, false);
                })
                .catch(err => {
                    logger.error(`ERROR: error on passport (middleware), ${err}`)
                    return done(err, false);
                });
        })
    );
};
