"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Catalogs", [
      {
        name: "пряжа",
        label: "Пряжа",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "спицы",
        label: "Спицы",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "крючки",
        label: "Крючки",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "аксесуары для вязания и рукоделия",
        label: "Аксесуары для вязания и рукоделия",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "помпоны",
        label: "Помпоны",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "подарочные сертификаты",
        label: "Подарочные сертификаты",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete("Catalogs", null, {});
  },
};
