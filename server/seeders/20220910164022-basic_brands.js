"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Brands", [
      {
        name: "alize",
        label: "Alize",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "gazzal",
        label: "Gazzal",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "yanart",
        label: "YanArt",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "пехорка",
        label: "Пехорка",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "гронитекс",
        label: "Гронитекс",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "alpina",
        label: "Alpina",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "gamma",
        label: "Gamma",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Brands", null, {});
  },
};
