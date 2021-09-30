'use strict';
const crypto = require("crypto");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
      },
      email: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
        get() {
          return () => this.getDataValue("password");
        },
      },
      phone: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
      image_url: {
        type: DataTypes.STRING,
      },
      reset_token: {
        type: DataTypes.STRING,
      },
      role_id: {
        type: DataTypes.INTEGER,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      tableName: 'users',
    }
  );

  return User;
};
