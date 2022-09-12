"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Color extends Model {
    static associate(models) {
      Color.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
      });
    }
  }
  Color.init(
    {
      name: DataTypes.STRING,
      img: DataTypes.STRING,
      count: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Color",
    }
  );
  return Color;
};
