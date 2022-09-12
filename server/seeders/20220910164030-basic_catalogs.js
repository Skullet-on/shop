"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Catalogs", [
      {
        name: "Пряжа",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Спицы",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Крючки",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Аксесуары для вязания и рукоделия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Помпоны",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Подарочные сертификаты",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Catalogs", null, {});
  },
};
