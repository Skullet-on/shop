"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      Product.belongsTo(models.Catalog, {
        as: "catalog",
        foreignKey: "catalogId",
      });
      Product.belongsTo(models.Brand, {
        as: "brand",
        foreignKey: "brandId",
      });
      Product.belongsToMany(models.Property, {
        as: "properties",
        through: models.ProductProperty,
        foreignKey: "productId",
      });
      Product.hasMany(models.ProductProperty, {
        as: "props",
        foreignKey: "productId",
      });
      Product.hasMany(models.Color, {
        as: "colors",
        foreignKey: "productId",
      });
      Product.belongsToMany(models.Order, {
        as: "orders",
        through: models.OrderProduct,
        foreignKey: "productId",
      });
    }
  }
  Product.init(
    {
      name: DataTypes.STRING,
      price: DataTypes.INTEGER,
      oldPrice: DataTypes.INTEGER,
      rating: DataTypes.INTEGER,
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
