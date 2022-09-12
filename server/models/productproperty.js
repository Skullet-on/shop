"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductProperty extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  ProductProperty.init(
    {
      description: DataTypes.STRING,
      value: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductProperty",
    }
  );
  return ProductProperty;
};
