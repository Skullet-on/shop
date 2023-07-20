"use strict";
const bcrypt = require("bcrypt");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    return queryInterface.bulkInsert("Users", [
      {
        email: "e.prischep@gmail.com",
        password: await bcrypt.hash("Skulleton13", 5),
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: "irinakatser23@gmail.com",
        password: await bcrypt.hash("1q2w#E$R", 5),
        role: "ADMIN",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
