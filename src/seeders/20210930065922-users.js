'use strict';
const User = require('../models').User;

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const userID = await queryInterface.rawSelect(
      "users",
      {
        where: { id: 1 },
      },
      ["id"]
    );
    if (!userID) {
      let data = [
        {
          username: "admin",
          password: "admin",
          email: "admin@oc.com",
          phone: "9849123456",
        }
      ];
      return await User.bulkCreate(data);
    }
    console.log('User seed has already been performed')
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tickets', null, {});
  },
};
