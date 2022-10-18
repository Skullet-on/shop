"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      Order.belongsToMany(models.Product, {
        as: "products",
        through: models.OrderProduct,
        foreignKey: "orderId",
      });
    }
  }
  Order.init(
    {
      fio: DataTypes.STRING,
      phone: DataTypes.STRING,
      description: DataTypes.STRING,
      city: DataTypes.STRING,
      street: DataTypes.STRING,
      building: DataTypes.STRING,
      corp: DataTypes.STRING,
      flat: DataTypes.STRING,
      isDone: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
