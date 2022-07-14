const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Token = sequelize.define("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, unique: true },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const BasketProduct = sequelize.define("basket_product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

const Product = sequelize.define("product", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  oldPrice: { type: DataTypes.INTEGER, defaultValue: 0 },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  img: { type: DataTypes.STRING, allowNull: false },
});

const Property = sequelize.define("property", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  type: { type: DataTypes.STRING, allowNull: false },
});

const Catalog = sequelize.define("catalog", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const Rating = sequelize.define("rating", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rate: { type: DataTypes.INTEGER, allowNull: false },
});

const ProductProperties = sequelize.define("product_properties", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  description: { type: DataTypes.STRING, allowNull: false, defaultValue: "" },
  value: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 },
});

const ProductColors = sequelize.define("product_colors", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  count: { type: DataTypes.INTEGER, defaultValue: 0 },
});

const CatalogProperty = sequelize.define("catalog_property", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasOne(Token);
Token.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

Basket.hasMany(BasketProduct);
BasketProduct.belongsTo(Basket);

Catalog.hasMany(Product);
Product.belongsTo(Catalog);

Brand.hasMany(Product);
Product.belongsTo(Brand, { as: "brand" });

Product.hasMany(Rating);
Rating.belongsTo(Product);

Product.hasMany(BasketProduct);
BasketProduct.belongsTo(Product);

Property.hasMany(ProductProperties);
ProductProperties.belongsTo(Property);

Product.hasMany(ProductProperties, { as: "info" });
ProductProperties.belongsTo(Product);

Product.hasMany(ProductColors, { as: "color" });
ProductColors.belongsTo(Product);

Catalog.belongsToMany(Property, { as: "properties", through: CatalogProperty });
Property.belongsToMany(Catalog, { as: "catalogs", through: CatalogProperty });
Catalog.hasMany(CatalogProperty);
CatalogProperty.belongsTo(Catalog);
Property.hasMany(CatalogProperty);
CatalogProperty.belongsTo(Property);

module.exports = {
  User,
  Token,
  Basket,
  BasketProduct,
  Product,
  Property,
  Catalog,
  CatalogProperty,
  Brand,
  Rating,
  ProductColors,
  ProductProperties,
};
