"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CatalogProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // CatalogProperty.belongsTo(models.Catalog, {
      //   as: "catalog",
      //   foreignKey: "catalogId",
      // });
      // CatalogProperty.belongsTo(models.CatalogProperty, {
      //   as: "catalogProperty",
      //   foreignKey: "catalogPropertyId",
      // });
    }
  }
  CatalogProperty.init(
    {},
    {
      sequelize,
      modelName: "CatalogProperty",
    }
  );
  return CatalogProperty;
};
