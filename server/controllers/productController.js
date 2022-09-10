const uuid = require("uuid");
const path = require("path");
const {
  Product,
  ProductProperties,
  ProductColors,
  Brand,
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

      if (req.files) {
        const { img } = req.files;
        fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, "..", "static/images", fileName));
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
        name: color.toLowerCase(),
        img: fileName,
        count,
        productId: product.id,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((element) => {
          if (element.property.type === "number") {
            ProductProperties.create({
              productId: product.id,
              value: element.description,
              propertyId: element.property.id,
            });
          } else {
            ProductProperties.create({
              productId: product.id,
              description: element.description.toLowerCase(),
              propertyId: element.property.id,
            });
          }
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
          {
            name,
            price,
            brandId,
            catalogId,
            img: fileName,
          },
          { where: { id: id } }
        );
      } else {
        product = await Product.update(
          { name: name.toLowerCase(), price, brandId, catalogId },
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
            if (property.type === "number") {
              ProductProperties.update(
                {
                  value: element.description,
                  propertyId: element.property.id,
                  productId: id,
                },
                { where: { id: property.dataValues.id } }
              );
            } else {
              ProductProperties.update(
                {
                  description: element.description.toLowerCase(),
                  propertyId: element.property.id,
                  productId: id,
                },
                { where: { id: property.dataValues.id } }
              );
            }
          } else {
            ProductProperties.create({
              productId: product.id,
              description: element.description.toLowerCase(),
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
      catalogId = null,
      limit,
      page,
      search = "",
      brands = [],
      weight = "",
    } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let products;
    console.log(weight);
    products = await Product.findAndCountAll({
      where: {
        [Op.and]: [
          {
            brandId: brands.length ? { [Op.or]: brands } : { [Op.ne]: 0 },
          },
          { catalogId: catalogId || { [Op.ne]: catalogId } },
          {
            name: { [Op.like]: `%${search.toLowerCase()}%` },
          },
        ],
      },
      limit,
      offset,
      include: [
        { model: ProductProperties, as: "info" },
        { model: ProductColors, as: "color" },
        {
          model: Brand,
          as: "brand",
        },
      ],
      order: [["color", "id"]],
      distinct: true,
    });

    return res.json(products);
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: [
          { model: ProductProperties, as: "info" },
          { model: ProductColors, as: "color" },
        ],
        order: [["color", "id"]],
      });

      if (!product) {
        return res.status(404).send("Not found");
      }

      return res.json(product);
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }
}

module.exports = new ProductController();
