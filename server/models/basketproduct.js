"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class BasketProduct extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // BasketProduct.belongsTo(models.Basket, {
      //   as: "basket",
      //   foreignKey: "basketId",
      // });
      // BasketProduct.belongsTo(models.Product, {
      //   as: "product",
      //   foreignKey: "productId",
      // });
    }
  }
  BasketProduct.init(
    {},
    {
      sequelize,
      modelName: "BasketProduct",
    }
  );
  return BasketProduct;
};
