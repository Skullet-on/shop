"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Basket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Basket.hasMany(models.BasketProduct, {
      //   as: "basketProduct",
      //   foreignKey: "basketProductId",
      // });
      // Basket.belongsTo(models.User, {
      //   as: "user",
      //   foreignKey: "userId",
      // });
    }
  }
  Basket.init(
    {},
    {
      sequelize,
      modelName: "Basket",
    }
  );
  return Basket;
};
