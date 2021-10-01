require("dotenv").config();


export const login = {
  jwtExpiration: process.env.JWT_EXPIRATION,
  jwtEncryption: process.env.JWT_ENCRYPTION
};
