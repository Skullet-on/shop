const uuid = require("uuid");
const path = require("path");
const {
  Product,
  ProductProperties,
  ProductColors,
} = require("../models/models");
const ApiError = require("../error/ApiError");
const { Op } = require("sequelize");

class ProductController {
  async create(req, res, next) {
    try {
      let {
        name,
        price,
        brandId,
        catalogId,
        info,
        color,
        count,
        oldPrice = 0,
      } = req.body;

      let fileName = "no-image.jpg";
      console.log(oldPrice);
      if (req.files) {
        const { img } = req.files;
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));
      }

      const product = await Product.create({
        name,
        price,
        oldPrice,
        img: fileName,
        brandId,
        catalogId,
      });

      await ProductColors.create({
        name: color,
        img: fileName,
        count,
        productId: product.id,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((element) => {
          ProductProperties.create({
            productId: product.id,
            description: element.description,
            propertyId: element.property.id,
          });
        });
      }

      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async edit(req, res, next) {
    try {
      let { name, price, brandId, catalogId, info, color } = req.body;
      const { id } = req.params;
      let product;

      if (req.files) {
        let fileName = "no-image.jpg";
        const { img } = req.files;
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static", fileName));

        product = await Product.update(
          { name, price, brandId, catalogId, img: fileName },
          { where: { id: id } }
        );
      } else {
        product = await Product.update(
          { name, price, brandId, catalogId },
          { where: { id: id } }
        );
      }

      if (info) {
        info = JSON.parse(info);

        info.forEach(async (element) => {
          const property = await ProductProperties.findOne({
            where: { id: element.property.id },
          });
          if (property) {
            ProductProperties.update(
              {
                description: element.description,
                propertyId: element.property.id,
                productId: id,
              },
              { where: { id: property.dataValues.id } }
            );
          } else {
            ProductProperties.create({
              productId: product.id,
              description: element.description,
              propertyId: element.property.id,
            });
          }
        });
      }

      return res.json("product");
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async remove(req, res) {
    const { id } = req.params;

    await ProductProperties.destroy({
      where: { productId: id },
    });

    const product = await Product.destroy({
      where: { id },
    });

    return res.json(product);
  }

  async getAll(req, res) {
    let {
      brandId = null,
      catalogId = null,
      limit,
      page,
      minPrice = null,
      maxPrice = null,
    } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    let products;

    products = await Product.findAndCountAll({
      where: {
        [Op.and]: [
          { brandId: brandId || { [Op.ne]: brandId } },
          { catalogId: catalogId || { [Op.ne]: catalogId } },
          {
            price: {
              [Op.and]: [
                { [Op.gte]: minPrice || 0 },
                { [Op.lte]: maxPrice || 10000 },
              ],
            },
          },
        ],
      },
      limit,
      offset,
      include: [
        { model: ProductProperties, as: "info" },
        { model: ProductColors, as: "color" },
      ],
      order: [["color", "id"]],
      distinct: true,
    });
    // }

    return res.json(products);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [
        { model: ProductProperties, as: "info" },
        { model: ProductColors, as: "color" },
      ],
      order: [["color", "id"]],
    });

    return res.json(product);
  }
}

module.exports = new ProductController();
