"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Properties", [
      {
        name: "вес",
        type: "number",
        currency: "г.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "длина",
        type: "number",
        currency: "м.",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "состав",
        type: "string",
        currency: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "материал",
        type: "string",
        currency: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "диаметр",
        type: "number",
        currency: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Properties", null, {});
  },
};
