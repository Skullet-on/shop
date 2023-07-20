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
        name: "nako",
        label: "Nako",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "wool sea",
        label: "Wool Sea",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "fibra natura",
        label: "Fibra Natura",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "lana gatto",
        label: "Lana Gatto",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "etrofil",
        label: "Etrofil",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "himalaya",
        label: "Himalaya",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "fancy yarn",
        label: "Fancy Yarn",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "knit me",
        label: "Knit Me",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Brands", null, {});
  },
};
