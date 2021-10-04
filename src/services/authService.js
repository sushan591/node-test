"use strict";

const jwt = require("jsonwebtoken");

const config = require("../config/loginConfig");
const { User } = require("../models");
import logger from './../utils/logger';

const getUniqueKeyFromBody = function (body) {
  let unique_key = body.email;
  if (typeof unique_key === "undefined") {
    if (typeof body.email != "undefined") {
      unique_key = body.email;
    } else {
      unique_key = null;
    }
  }

  return unique_key;
};
module.exports.getUniqueKeyFromBody = getUniqueKeyFromBody;

const authUser = async function (userInfo, callback) {
  //returns token
  let unique_key;

  unique_key = await getUniqueKeyFromBody(userInfo);

  if (!unique_key) return callback(new Error("Please enter an email to login"));

  if (!userInfo.password)
    return callback(new Error("Please enter a password to login"));

  await User.findOne({
    where: {
      email: unique_key
    }
  })
    .then(async user => {
      if (user === null) {
        return callback("Not registered");
      } else {
        const result = await user.correctPassword(userInfo.password);
        if (result) {
          await user
            .update({
              reset_token: null
            })
            .then(async data => {
              const { token, expiration } = await issueToken(user.id);
              callback(null, { message: "Login successful", token, expiration, user });
            });
        } else {
          return callback(null, { response: "errors" });
        }
      }
    })
    .catch(err => logger.error("Error: " + err));
};
module.exports.authUser = authUser;

function issueToken(userId) {
  const expiration = parseInt(config.login.jwtExpiration);
  const token =
    "Bearer: " +
    jwt.sign({ user_id: userId }, config.login.jwtEncryption, {
      expiresIn: expiration
    });
  return { token, expiration };
}
