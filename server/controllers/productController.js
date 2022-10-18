const uuid = require("uuid");
const path = require("path");
const { Product, Property, ProductProperty, Color } = require("../models");
const { validationResult } = require("express-validator");
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
        properties,
        color,
        count,
        oldPrice = 0,
      } = req.body;

      const { errors } = validationResult(req);

      if (!req.files) {
        errors.push({
          msg: "Фото не выбрано",
          param: "img",
        });
      }

      if (JSON.parse(properties).length) {
        const propErrors = {};
        JSON.parse(properties).map((property) => {
          if (!property.description) {
            propErrors[property.number] = "Поле не должно быть пустым";
          } else if (
            property.property.type === "number" &&
            property.description < 0
          ) {
            propErrors[property.number] = "Число не должно быть отрицательным";
          }
        });
        if (Object.keys(propErrors).length) {
          errors.push({
            msg: "Свойства не должны быть пустыми",
            param: "properties",
            data: propErrors,
          });
        }
      }

      const formatErrors = errors.reduce((acc, curr) => {
        return { ...acc, [curr.param]: { message: curr.msg, ...curr.data } };
      }, {});

      if (errors.length) {
        return next(
          ApiError.badRequest(400, "Ошибка при валидации", formatErrors)
        );
      }

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

      await Color.create({
        name: color.toLowerCase(),
        img: fileName,
        count,
        productId: product.id,
      });

      if (properties.length) {
        properties = JSON.parse(properties);
        properties.forEach((element) => {
          if (element.property.type === "number") {
            ProductProperty.create({
              productId: product.id,
              value: element.description,
              propertyId: element.property.id,
            });
          } else {
            ProductProperty.create({
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
      const { errors } = validationResult(req);

      let {
        name,
        price,
        brandId,
        catalogId,
        properties,
        color,
        oldPrice = 0,
      } = req.body;

      if (JSON.parse(properties).length) {
        const propErrors = {};
        JSON.parse(properties).map((property) => {
          if (!property.value) {
            propErrors[property.id] = "Поле не должно быть пустым";
          } else if (property.type === "number" && property.value < 0) {
            propErrors[property.id] = "Число не должно быть отрицательным";
          }
        });
        if (Object.keys(propErrors).length) {
          errors.push({
            msg: "Свойства не должны быть пустыми",
            param: "properties",
            data: propErrors,
          });
        }
      }

      const clr = JSON.parse(color);
      if (!clr.name) {
        errors.push({
          msg: "Название цвета не может быть пустым",
          param: "color",
          data: clr,
        });
      }
      if (clr.count < 0) {
        errors.push({
          msg: "Количество не может быть отрицательным",
          param: "count",
          data: clr,
        });
      }

      const formatErrors = errors.reduce((acc, curr) => {
        return { ...acc, [curr.param]: { message: curr.msg, ...curr.data } };
      }, {});

      if (errors.length) {
        return next(
          ApiError.badRequest(400, "Ошибка при валидации", formatErrors)
        );
      }

      const { id } = req.params;
      let product;

      if (req.files) {
        let fileName = "no-image.jpg";
        const { img } = req.files;
        fileName = clr.img;
        img.mv(path.resolve(__dirname, "..", "static/images", fileName));

        await Color.update(
          {
            img,
          },
          {
            where: { id: clr.id },
          }
        );

        product = await Product.update(
          {
            name,
            price,
            oldPrice,
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

      await Color.update(
        {
          name: clr.name,
          count: clr.count,
        },
        {
          where: { id: clr.id },
        }
      );

      if (properties) {
        properties = JSON.parse(properties);

        properties.forEach(async (element) => {
          const property = await Property.findOne({
            where: { id: element.id },
          });
          if (property) {
            if (property.dataValues.type === "number") {
              ProductProperty.update(
                {
                  value: element.value,
                  propertyId: element.id,
                  productId: id,
                },
                { where: { productId: id, propertyId: element.id } }
              );
            } else {
              ProductProperty.update(
                {
                  description: element.value.toLowerCase(),
                  propertyId: element.id,
                  productId: id,
                },
                { where: { productId: id, propertyId: element.id } }
              );
            }
          } else {
            ProductProperty.create({
              productId: product.id,
              description: element.value.toLowerCase(),
              propertyId: element.id,
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

    await ProductProperty.destroy({
      where: { productId: id },
    });

    const product = await Product.destroy({
      where: { id },
    });

    return res.json(product);
  }

  async getAll(req, res) {
    let { catalogId = null, limit, page, search = "", brands = [] } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let products;

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
      include: ["properties", "brand", "catalog", "colors"],
      order: [["colors", "id"]],
      distinct: true,
    });

    return res.json(products);
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const product = await Product.findOne({
        where: { id },
        include: ["properties", "colors"],
        order: [["colors", "id"]],
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
