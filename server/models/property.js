"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Property extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Property.belongsToMany(models.Product, {
        as: "products",
        through: models.ProductProperty,
        foreignKey: "propertyId",
      });
      Property.belongsToMany(models.Catalog, {
        as: "catalogs",
        through: models.CatalogProperty,
        foreignKey: "propertyId",
      });
    }
  }
  Property.init(
    {
      name: DataTypes.STRING,
      type: DataTypes.STRING,
      currency: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Property",
    }
  );
  return Property;
};
