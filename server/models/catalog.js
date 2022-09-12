"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Catalog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Catalog.hasMany(models.Product, {
        as: "products",
        foreignKey: "id",
      });
      Catalog.belongsToMany(models.Property, {
        as: "properties",
        through: models.CatalogProperty,
        foreignKey: "catalogId",
      });
    }
  }
  Catalog.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Catalog",
    }
  );
  return Catalog;
};
