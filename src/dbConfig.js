require("dotenv").config();

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorageTableName: "_sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "_sequelize_data",
  },
  test: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.TEST_DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorageTableName: "_sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "_sequelize_data",
  },
  staging: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorageTableName: "_sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "_sequelize_data",
  },
  production: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "mysql",
    migrationStorageTableName: "_sequelize_meta",
    seederStorage: "sequelize",
    seederStorageTableName: "_sequelize_data",
  },
};
